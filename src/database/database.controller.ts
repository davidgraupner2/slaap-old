import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}

  @Get('tables')
  tables() {
    // console.log(req);
    return this.databaseService.tables();
  }
}
