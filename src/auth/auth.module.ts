import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from 'src/models/user.model';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';
import { LinkedinStrategy } from './strategy/linkedin-strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';
import {
  LinkedInAccount,
  LinkedInAccountModel,
} from 'src/models/linkedin-account.model';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({
      session: true,
      defaultStrategy: 'google',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserModel },
      { name: LinkedInAccount.name, schema: LinkedInAccountModel },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    LinkedinStrategy,
    FacebookStrategy,
  ],
})
export class AuthModule {}
