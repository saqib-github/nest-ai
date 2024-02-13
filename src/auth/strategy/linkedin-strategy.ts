import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-linkedin-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('LINKEDIN_CLIENT_ID'),
      clientSecret: configService.get('LINKEDIN_CLIENT_SECRET'),
      callbackURL: configService.get('LINKEDIN_CALLBACK_URL'),
      scope: [
        'openid',
        'profile',
        'w_member_social',
        'email',
        // 'r_learningdata',
      ],
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      linkedinId: profile.id,
      email:
        profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : null,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      picture:
        profile.photos && profile.photos.length > 0
          ? profile.photos[0].value
          : null,
    };

    console.log({ accessToken, refreshToken });

    // You can save the user to your database or perform other operations here

    return done(null, user);
  }
}
