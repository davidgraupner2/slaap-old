import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('register')
  register(@Body() dto: userDTO) {
    return this.authservice.register(dto);
  }

  @Post('login')
  login() {
    return this.authservice.login();
  }
}
