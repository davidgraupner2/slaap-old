import {
  Controller,
  Post,
  Body,
  Request,
  Ip,
  UseGuards,
  Get,
} from '@nestjs/common';
import * as dto from 'src/users/dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './passport.guards/jwt.auth.guard';
import { LocalAuthGuard } from './passport.guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUserLocally(@Request() req) {
    // if user validation with passport.js succeeds - the user object
    // is added to the request object and we return that, else the code in this route handler
    // will never run - passport.js will return an unauthorized exception
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('yo')
  yo() {
    return 'Hello';
  }
}
