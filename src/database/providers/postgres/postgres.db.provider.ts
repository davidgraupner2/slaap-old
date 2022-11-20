import { Injectable, Logger } from '@nestjs/common';
import { IDBProviderInterface, constructorInterface } from '../interfaces';
import { Pool } from 'pg';

@Injectable()
export class PostGresDBProvider implements IDBProviderInterface {
  /* Define the properties we need 
  - as per the IDBProviderInterface */
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;

  // Define the custom properties we need to operate
  connection_pool: Pool;

  // Create a new logging instance
  private readonly logger = new Logger(PostGresDBProvider.name);

  /* Construct the DBprovider using the values passed in 
   - we are simulating named paramters using an Interface */
  constructor({
    type,
    hostName,
    port,
    databaseName,
    userName,
    password,
  }: constructorInterface) {
    // Set the properties to what was passed in
    this.type = type;
    this.hostName = hostName;
    this.port = port;
    this.databaseName = databaseName;
    this.userName = userName;
    this.password = password;

    // Setup the connection pool we will use
    this.connection_pool = new Pool({
      user: this.userName,
      host: this.hostName,
      database: this.databaseName,
      port: this.port,
      password: this.password,
    });
  }

  /*Show the current configuration, 
  used to setup the connection */
  showConfig(): object {
    return {
      type: this.type,
      hostname: this.hostName,
      port: this.port,
      databaseName: this.databaseName,
      userName: this.userName,
      password: this.password,
    };
  }

  /* Execute a standard SQL Query */
  private async executeQueryText(sqlText: string) {
    const start = Date.now();

    console.log(sqlText);

    const res = await this.connection_pool.query(sqlText);

    const duration = Date.now() - start;

    console.log('execute query', { sqlText, duration, rows: res.rowCount });

    this.logger.log(
      `Executed Query: '${sqlText}' - taking ${duration} milliseconds - returning ${res.rowCount} rows:`,
    );

    return res.rows;
  }

  async doInsert(
    tableName: String,
    columns: Array<string>,
    values: Array<string>,
  ) {
    // Create the SQL Statement for the insert
    const sqlText = `insert into ${tableName} (${String(
      columns,
    )}) values (${String(values)})`;

    await this.executeQueryText(sqlText);
  }

  async doQuery(tableName: String, columns: Array<String>) {
    const start = Date.now();

    const sqlText = 'select ' + String(columns) + ' from ' + tableName;
    console.log(sqlText);

    const res = await this.connection_pool.query(sqlText);

    const duration = Date.now() - start;

    console.log('execute query', { sqlText, duration, rows: res.rowCount });

    this.logger.log(
      `Executed Query: '${sqlText}' - taking ${duration} milliseconds - returning ${res.rowCount} rows:`,
    );

    return res.rows;
  }
}
