import {
  IDictionaryManager,
  IDictionaryTable,
  // TDictionaryManagerConstructor,
} from '../interfaces';
import { Pool } from 'pg';
import { IDBProviderInterface } from 'src/database/providers/interfaces';

export class PostgresDictionaryManager implements IDictionaryManager {
  // Define the custom properties we need to operate
  database_provider: IDBProviderInterface;

  // List of tables that are loaded and managed
  tables: IDictionaryTable[];

  // Stores the Database connect
  // In Potsgres case - a database pool
  // setupDatabasebaseProvider(database_provider: IDBProviderInterface) {
  //   this.database_provider = database_provider;
  // }

  setupDatabaseProvider(database_provider: IDBProviderInterface): void {
    this.database_provider = database_provider;
  }

  loadTable(table_alias: string): IDictionaryTable {
    console.log('Loading Table');
    return undefined;
    // throw new Error('Method not implemented.');
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
