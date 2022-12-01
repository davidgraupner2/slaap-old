import { Controller, Post, Body } from '@nestjs/common';
import * as dto from 'src/users/dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('login')
  loginUser(@Body() dto: dto.LoginUserDto) {
    return this.userService.validUser(dto.email, dto.password);
  }
}
