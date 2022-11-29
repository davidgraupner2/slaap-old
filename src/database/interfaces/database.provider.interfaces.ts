import { ConfigService } from 'src/config/config.service';
// import { DictionaryManager } from 'src/database/providers/postgres';

export interface ISchemaManager {
  /*
  Public Properties
  */

  // Returns an array of tables the schema manager is aware of
  tables: Array<IDatabaseTable>;

  /*
    Public Methods
  */

  // Returns a specific table requested or undefined if not found
  table(
    databaseName: string,
    schemaName: string,
    name: string,
  ): IDatabaseTable | undefined;

  // Adds a new table to the schema and returns this new table
  addTable(
    databaseName: string,
    schemaName: string,
    name: string,
    inheritsFrom?: string,
  ): IDatabaseTable;
}

/* Interface that all DBProviders must adhere to */
export interface IDatabaseProvider {
  // Some common variables
  // - all concrete classes must have
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;

  // Public methods
  // - all concrete classes must have
  showConfig(): object;
  findMany(table_name: string): any;
}

export type TDatabaseFieldAndValue = {
  fieldName: string;
  fieldValue: any;
};

export type TDatabaseProviderConstructor = {
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;
  config_service: ConfigService;
  // dictionary_manager: DictionaryManager;
};

export interface IDatabaseColumn {
  /* 
  Properties that must be visible on the interface
  */
  name: string;
  comment: string;
  value: any;
}

export interface IDatabaseTable {
  name: string;
  databaseName: string;
  schemaName: string;
  columns: Array<IDatabaseColumn>;
}
