import { Injectable, Logger } from '@nestjs/common';
import * as db_interfaces from '../interfaces';
import { Pool } from 'pg';
import { PostGresDictionaryManager } from './postgres.dictionary.manager';

@Injectable()
export class PostGresDBProvider implements db_interfaces.IDBProviderInterface {
  /* Define the properties we need 
  - as per the IDBProviderInterface */
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;

  // Declare the Dictionary Manager
  dictionary_manager: db_interfaces.IDBDictionaryManager;

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
  }: db_interfaces.TDBProviderConstructor) {
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

    // Setup the dictionary manager we will use
    this.dictionary_manager = new PostGresDictionaryManager(this);
  }

  query(tableName: string): object {
    console.log('Getting new Query Object ' + tableName);
    return new Query(tableName);
  }

  findFirst(tableName: string): Object {
    return new findFirst(tableName);
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

class findFirst {
  // Local properties we need
  private columns = ['*'];
  private tableName = '';
  private whereClause = [];

  constructor(tableName: string) {
    // Update local properties with values passed in
    this.tableName = tableName;
  }

  addColumn(name: string): findFirst {
    // Add the column to the column list - if its not there already
    if (!this.columns.includes(name)) {
      this.columns.push(name);
    }

    return this;
  }

  where(params: db_interfaces.TDBFieldAndValue): findFirst {
    // Add a (AND) whereclause to the list
    if (!this.whereClause) {
      this.whereClause.push(`${params.fieldName} = ${params.fieldValue}`);
    } else {
      this.whereClause.push(`and ${params.fieldName} = ${params.fieldValue}`);
    }

    return this;
  }

  addOr(fieldName: string, value: any): findFirst {
    // Add a (OR) whereclause to the list
    if (!this.whereClause) {
      this.whereClause.push(`${fieldName} = ${value}`);
    } else {
      this.whereClause.push(`or ${fieldName} = ${value}`);
    }

    return this;
  }

  execute() {
    console.log(
      'Executing: ' +
        `select ${String(this.columns)} from ${this.tableName} where ${String(
          this.whereClause,
        )}`,
    );
  }
}

class Query {
  // Properties we need
  private columns = [];
  private table = '';

  constructor(tableName: string) {
    // Update local properties with values passed in
    console.log('Calling Constructor with ' + tableName);
    this.table = tableName;
  }

  addColumn(name: string): Query {
    console.log('Adding New Column');
    // Add the column to the column list - if its not there already
    if (!this.columns.includes(name)) {
      this.columns.push(name);
    }

    return this;
  }

  execute() {
    console.log('Executing');
    console.log(`select ${String(this.columns)} from ${this.table} `);
  }
}
