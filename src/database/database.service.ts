import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../database/constants';

@Injectable()
export class DatabaseService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async doQuery(tableName: String, columns: Array<String>) {
    const start = Date.now();

    const sqlText = 'select ' + String(columns) + ' from ' + tableName;
    console.log(sqlText);

    const res = await this.conn.query(sqlText);

    const duration = Date.now() - start;

    console.log('execute query', { sqlText, duration, rows: res.rowCount });

    return res.rows;
  }
}
