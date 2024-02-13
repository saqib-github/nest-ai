import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  HttpCode,
  HttpStatus,
  UseFilters,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseFilters(new HttpExceptionFilter())
  register(@Body() createAuthDto: CreateAuthDto) {
    // throw new ForbiddenException();
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    // Handle the Google authentication callback
    return this.authService.handleGoogleLogin(req);
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinAuth() {}

  @Get('linkedin/callback')
  // @UseGuards(AuthGuard('linkedin'))
  async linkedinAuthRedirect(@Req() req: Express.Request) {
    const { code } = req['query'];
    // Handle the LinkedIn authentication callback
    console.log({ code });
    return this.authService.handleLinkedinLogin(code);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: any) {
    // Handle the Facebook authentication callback
    return this.authService.handleFacebookLogin(req);
  }
}
