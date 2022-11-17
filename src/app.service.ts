import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './database/postgres/constants';
import { DatabaseService } from './database/postgres/database.service';

@Injectable()
export class AppService {
  // Informs NestJS to inject the PostGres Db Module
  // constructor(@Inject(PG_CONNECTION) private conn: any) {}
  constructor(private readonly databaseService: DatabaseService) {}

  async getUsers() {
    // const res = await this.conn.query('select * from users');
    // return res.rows;

    return this.databaseService.doQuery('dict_table', ['id', 'table_name']);
  }
}
