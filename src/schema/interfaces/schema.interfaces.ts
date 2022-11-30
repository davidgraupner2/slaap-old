export interface ISchemaConfig {
  version: number;
  tables: Array<ISchemaTableConfig>;
}

export interface ISchemaTableConfig {
  schemaName: string;
  tableName: string;
  columns: Array<ISchemaTableColumnConfig>;
}

export interface ISchemaTableColumnConfig {
  type: string;
  name: string;
}
