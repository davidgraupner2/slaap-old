/* This file contains the interfaces and types that dictionary managers should adhere to */
/* Interface for DictionaryManagers */

import { IDBProviderInterface } from 'src/database/providers/interfaces';

export interface IDictionaryManager {
  ///////////////////////////////////////////////
  // Local data the dictionary manager must have
  ///////////////////////////////////////////////

  // The Dictionary manager will store an array of tables
  // the have been loaded into cache
  tables: Array<IDictionaryTable>;

  /////////////////////////////////////////
  // Public Methods
  // - all concrete classes must implement
  /////////////////////////////////////////

  // Sets up the database provider that will be used
  // by the dictionary manager to query the database
  setupDatabaseProvider(database_provider: IDBProviderInterface): void;

  loadTable(table_alias: string): IDictionaryTable;
  cachedTable(table_alias: string): boolean;
}

export type IDictionaryTable = {
  id: number;
  alias: string;
  name: string;
  description: string;
  columns: Array<IDictionaryField>;
};

export interface IDictionaryField {
  id: number;
  alias: string;
  name: string;
  description: string;
  type: string;
  length: number;
  precison: number;
  scale: number;
}

// export type TDictionaryManagerConstructor = {
//   type: string;
//   hostName: string;
//   port: number;
//   databaseName: string;
//   userName: string;
//   password: string;
// };
