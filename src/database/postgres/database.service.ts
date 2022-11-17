import { Injectable, Inject, Logger } from '@nestjs/common';
import { PG_CONNECTION } from 'src/database/postgres/constants';

@Injectable()
export class DatabaseService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  // Create a new logging instance
  private readonly logger = new Logger(DatabaseService.name);

  async doInsert(
    tableName: String,
    columns: Array<string>,
    values: Array<string>,
  ) {
    // Create the SQL Statement for the insert
    const sqlText = `insert into ${tableName} (${String(
      columns,
    )}) values (${String(values)})`;

    await this.executeQuery(sqlText);
  }

  private async executeQuery(sqlText: String) {
    const start = Date.now();

    console.log(sqlText);

    const res = await this.conn.query(sqlText);

    const duration = Date.now() - start;

    console.log('execute query', { sqlText, duration, rows: res.rowCount });

    this.logger.log(
      `Executed Query: '${sqlText}' - taking ${duration} milliseconds - returning ${res.rowCount} rows:`,
    );

    return res.rows;
  }

  async doQuery(tableName: String, columns: Array<String>) {
    const start = Date.now();

    const sqlText = 'select ' + String(columns) + ' from ' + tableName;
    console.log(sqlText);

    const res = await this.conn.query(sqlText);

    const duration = Date.now() - start;

    console.log('execute query', { sqlText, duration, rows: res.rowCount });

    this.logger.log(
      `Executed Query: '${sqlText}' - taking ${duration} milliseconds - returning ${res.rowCount} rows:`,
    );

    return res.rows;
  }
}
