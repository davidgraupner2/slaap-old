/* This file contains the interfaces and types that dictionary managers should adhere to */
/* Interface for DictionaryManagers */

export interface IDictionaryManager {
  // Public Properties
  // - All concrete classes must implement
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;

  tables: Array<IDictionaryTable>;

  // Public Methods
  // - all concrete classes must implement
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

export type TDictionaryManagerConstructor = {
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;
};
