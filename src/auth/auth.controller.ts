import { Controller, Post, Request, UseGuards, Get, Version } from '@nestjs/common';
import * as dto from 'src/users/dto';
import { AuthService } from './auth.service';
import { JWTRefreshAuthGuard, LocalAuthGuard, Public } from 'src/auth/passport.guards';
import { User } from 'src/decorators/decorator.user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Public()
  @UseGuards(JWTRefreshAuthGuard)
  @Get('refreshToken')
  refresh_token(@Request() req) {
    return this.authService.refreshTokens(req.user['sub'], req.user['email']);
  }

  @Get('logout')
  logout(@Request() req) {
    console.log(req.user);
    return this.authService.logout(req.user.id);
  }
}
