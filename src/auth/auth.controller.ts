import { Controller, Post, Request, UseGuards, Get, Version } from '@nestjs/common';
import * as dto from 'src/users/dto';
import { AuthService } from './auth.service';
import { JWTRefreshAuthGuard, LocalAuthGuard, Public } from 'src/auth/passport.guards';
import { User } from 'src/decorators/decorator.user';
import { IdTokenService } from './id.token.service';
import { TokenActionTypeEnum } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private idTokenService: IdTokenService) {}

  /* 
  Public route used to authenticate a user locally 
  - Database Name / Password
  and return a JWT Token
  */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUserLocally(@Request() req) {
    // if user validation with passport.js succeeds - the user object
    // is added to the request object and we return that, else the code in this route handler
    // will never run - passport.js will return an unauthorized exception
    return this.idTokenService.getTokens(req.user.id, req.user.username, TokenActionTypeEnum.login);
  }

  @Public()
  @UseGuards(JWTRefreshAuthGuard)
  @Get('refreshToken')
  refresh_token(@Request() req) {
    console.log(req.user);
    return this.idTokenService.refreshTokens(req.user.id, req.user.email);
  }

  @Get('logout')
  logout(@Request() req) {
    console.log(req.user);
    return this.authService.logout(req.user.id);
  }
}
