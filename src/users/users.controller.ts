import { Controller } from '@nestjs/common';
import { JWTAuthGuard, Public } from 'src/auth/auth.guards';
import { UseGuards, Get, Request } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('profile2')
  getProfile2(@Request() req) {
    return 'Hello World';
  }
}
