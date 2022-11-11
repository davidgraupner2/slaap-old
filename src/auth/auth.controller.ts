import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('register')
  register() {
    return this.authservice.register();
  }

  @Post('login')
  login() {
    return this.authservice.login();
  }
}
