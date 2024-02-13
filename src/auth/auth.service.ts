import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/models/user.model';
import * as argon from 'argon2';
import axios from 'axios';
import { LinkedInAccount } from 'src/models/linkedin-account.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('LinkedInAccount')
    private readonly linkedAccountModel: Model<LinkedInAccount>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    try {
      // generate the password hash
      const password = await argon.hash(createAuthDto.password);
      const user = new this.userModel({ email: createAuthDto.email, password });
      const createdUser = await user.save();
      return this.signToken(createdUser._id, user.email);
    } catch (error) {
      // Check if the error is a duplicate key violation based on the error message
      if (error.message.includes('duplicate key error')) {
        // Duplicate key violation
        throw new ForbiddenException('User with this email already exists.');
      } else {
        // Some other error occurred
        console.error('Error creating user:', error);
        throw new ForbiddenException('Error creating user.');
      }
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.userModel.findOne({ email: createAuthDto.email });
      // if user does not exist throw exception
      if (!user) throw new ForbiddenException('Credentials incorrect');

      const pwMatches = await argon.verify(
        user.password,
        createAuthDto.password,
      );
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
      return this.signToken(user._id, user.email);
    } catch (error) {
      throw new ForbiddenException('Error while login');
    }
  }

  async handleGoogleLogin(req: any) {
    // console.log(req);
  }
  async handleLinkedinLogin(code: string) {
    await this.signInWithLinkedIn(code);
  }
  async handleFacebookLogin(req: any) {
    // console.log(req);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
  signInWithLinkedIn = async (code: any) => {
    console.log(
      this.config.get('LINKEDIN_CALLBACK_URL'),
      this.config.get('LINKEDIN_CLIENT_ID'),
      this.config.get('LINKEDIN_CLIENT_SECRET'),
    );
    // Prepare the data to send to LinkedIn's access token endpoint
    try {
      const data = new URLSearchParams();
      data.append('grant_type', 'authorization_code');
      data.append('code', code);
      data.append('redirect_uri', this.config.get('LINKEDIN_CALLBACK_URL'));
      data.append('client_id', this.config.get('LINKEDIN_CLIENT_ID'));
      data.append('client_secret', this.config.get('LINKEDIN_CLIENT_SECRET'));

      // Make a POST request to LinkedIn's access token endpoint
      const response = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      // Extract the access token from the response
      const { access_token } = response.data;
      console.log(response.data);
      if (access_token) {
        // Make a GET request to LinkedIn's user information endpoint
        const userInfoResponse = await axios.get(
          'https://api.linkedin.com/v2/userinfo',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );

        // Extract the user information from the response
        const userInfo = userInfoResponse.data;
        // console.log(userInfo);
        const findLinkedAccount = await this.linkedAccountModel.findOne({
          sub: userInfo.sub,
        });
        console.log({ findLinkedAccount });
        if (findLinkedAccount) {
          return new ForbiddenException('Account already connected');
        }

        const newLinkedAccount = new this.linkedAccountModel({
          ...(response.data || {}),
          sub: userInfo?.sub,
        });
        const connectLinkedAccount = await newLinkedAccount.save();
        console.log({ connectLinkedAccount });
        return connectLinkedAccount;

        // return { message: 'Your account connected successfully' };
      }
    } catch (error) {
      throw new ForbiddenException(
        'Error while connecting account, please try again later',
      );
    }
  };
}
