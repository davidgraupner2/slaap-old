import { Body, Controller, Post } from '@nestjs/common';
import { SpawnSyncOptionsWithBufferEncoding } from 'child_process';
import { AuthService } from './auth.service';
import { localLoginDTO } from './dto';
// import { userDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  // @Post('register')
  // register(@Body() dto: userDTO) {
  //   return this.authservice.register(dto);
  // }

  @Post('login')
  login(@Body() dto: localLoginDTO) {
    return this.authservice.validateUser(dto);
  }
}
