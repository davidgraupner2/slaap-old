import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DB_CONNECTION } from './database/constants';

@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(DB_CONNECTION) private readonly DBConnection,
  ) {}

  @Get('users')
  getUsers() {
    return this.DBConnection.showConfig();
  }

  @Get('usersq')
  getUsersq() {
    return this.DBConnection.executeQueryText('select * from user');
  }
}
