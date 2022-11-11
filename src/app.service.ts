import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './database/constants';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async getUsers() {
    const res = await this.conn.query('select * from users');
  }
}
