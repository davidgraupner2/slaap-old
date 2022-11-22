import { Body, Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { localLoginDTO } from './dto';
import { LocalAuthGuard, JWTAuthGuard, Public } from './auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  // @Post('register')
  // register(@Body() dto: userDTO) {
  //   return this.authservice.register(dto);
  // }

  // Login uses the local passport strategy to authenticate the user
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // This will only get called if the 'validate' function
    // in the local auth strategy was successful and the user was authenticated

    // If the user was successful - the user object will be added to the request object

    // return a valid JWT Token
    return this.authservice.signedToken(req.user.id, req.user.username);
  }
}
