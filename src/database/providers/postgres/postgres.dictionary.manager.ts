import { table } from 'console';
import * as db_interfaces from '../interfaces';
import { IDictionaryTable } from '../interfaces';
import { PostGresDBProvider } from './postgres.db.provider';

/* Loads and manages the main data dictionary */
export class PostGresDictionaryManager
  implements db_interfaces.IDBDictionaryManager
{
  //local properties
  tables: Array<IDictionaryTable>;
  db_provider: db_interfaces.IDBProviderInterface;

  // Constructor gets passed the DB Provider
  constructor(dbProvider: db_interfaces.IDBProviderInterface) {
    // Save the provider as a local variable
    this.db_provider = dbProvider;
  }

  // Loads a table into the table collection
  loadTable(table_alias: string) {
    if (this.cachedTable(table_alias)) {
      return this.tables.find((table) => {
        table.alias === table_alias.toUpperCase();
      });
    } else {
    }
  }

  cachedTable(table_alias) {
    // Loop through the tables already loaded and see if its cached
    this.tables.forEach((table) => {
      if (table.alias === table_alias.toUpperCase()) {
        // Table has already been cached
        return true;
      }
    });

    // Table was not found - not cached
    return false;
  }
}

class Table implements db_interfaces.IDictionaryTable {
  id: number;
  alias: string;
  name: string;
  description: string;
  columns: Field[];
}

class Field implements db_interfaces.IDictionaryField {
  id: number;
  alias: string;
  name: string;
  description: string;
  type: string;
  length: number;
  precison: number;
  scale: number;
}
