import {
  IDictionaryManager,
  IDictionaryTable,
  TDictionaryManagerConstructor,
} from '../interfaces';
import { Pool } from 'pg';

export class PostgresDictionaryManager implements IDictionaryManager {
  /* Define the properties we need 
  - as per the Interface */
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;

  // Define the custom properties we need to operate
  connection_pool: Pool;

  /* Construct the DBprovider using the values passed in 
   - we are simulating named paramters using an Interface */
  constructor({
    type,
    hostName,
    port,
    databaseName,
    userName,
    password,
  }: TDictionaryManagerConstructor) {
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

  // List of tables that are loaded and managed
  tables: IDictionaryTable[];

  loadTable(table_alias: string): IDictionaryTable {
    throw new Error('Method not implemented.');
    // if (this.cachedTable(table_alias)) {
    //   return this.tables.find((table) => {
    //     table.alias === table_alias.toUpperCase();
    //   });
    // } else {
    // }
  }
  cachedTable(table_alias: string): boolean {
    throw new Error('Method not implemented.');
    // Loop through the tables already loaded and see if its cached
    // this.tables.forEach((table) => {
    //   if (table.alias === table_alias.toUpperCase()) {
    //     // Table has already been cached
    //     return true;
    //   }
    // });

    // // Table was not found - not cached
    // return false;
  }
}
