import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './database/constants';

@Injectable()
export class AppService {
  // Informs NestJS to inject the PostGres Db Module
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async getUsers() {
    const res = await this.conn.query('select * from users');
    return res.rows;
  }
}
