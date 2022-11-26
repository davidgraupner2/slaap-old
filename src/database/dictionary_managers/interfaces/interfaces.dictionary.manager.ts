/* This file contains the interfaces and types that dictionary managers should adhere to */
/* Interface for DictionaryManagers */

import { IDBProviderInterface } from 'src/database/providers/interfaces';

// Defines the public interface for the Database Dictionary Manager
// - The Data Dictionary stores and retrieves the platforms data structure
// - in the database and governs the behavior of the Database Provider
export interface IDictionaryManager {
  ///////////////////////////////////////////////
  // Local data
  // - All concrete classes must have
  ///////////////////////////////////////////////

  // The Dictionary manager will store an array of tables
  // the have been loaded into cache
  tables: Array<IDictionaryTable>;

  // The Dictionary manager will store the name of the database
  // tables where the data definitions are stored
  dictionary_table_name: string;
  dictionary_fields_name: string;

  /////////////////////////////////////////
  // Public Methods
  // - all concrete classes must implement
  /////////////////////////////////////////

  // Sets up the dictionary manager with the necessary
  // database provider and class manager table names
  initialise(
    database_provider: IDBProviderInterface,
    dictionary_table_name: string,
    dictionary_fields_name: string,
  ): void;

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
