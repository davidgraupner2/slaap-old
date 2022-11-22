import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { localLoginDTO } from './dto';
import { LocalAuthGuard, JWTAuthGuard, Public } from './auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Public()
  @Post('register')
  register(@Request() req) {
    return 'Register';
  }

  @Get('logout')
  logout(@Request() req) {
    // console.log(req);
    this.authservice.logout(req.user.userId);
  }

  @Get('refresh')
  refresh_token(@Request() req) {
    return 'logout';
  }

  // Login uses the local passport strategy to authenticate the user
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // This will only get called if the 'validate' function
    // in the local auth strategy was successful and the user was authenticated

    // If the user was successful - the user object will be added to the request object

    // Get the JWT and Refresh Tokens
    const tokens = this.authservice.getTokens(req.user.id, req.user.username);

    // return the tokens
    return tokens;
  }
}
