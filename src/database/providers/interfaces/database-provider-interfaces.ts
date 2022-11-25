/* Interface that all DBProviders must adhere to */
export interface IDBProviderInterface {
  // Some common variables
  // - all concrete classes must have
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;
  dictionary_manager: IDBDictionaryManager;

  // Public methods
  // - all concrete classes must have
  showConfig(): object;
}

/* Interface for DictionaryManagers */
export interface IDBDictionaryManager {
  // Public Properties
  tables: Array<IDictionaryTable>;

  // Public Methods
  // - all concrete classes must have
  loadTable(table_alias: string): IDictionaryTable;
  cachedTable(table_alias: string): boolean;
}

export type TDBProviderConstructor = {
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;
};

export type TDBFieldAndValue = {
  fieldName: string;
  fieldValue: any;
};

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
