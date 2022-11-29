import { DatabaseProviderTable } from './database.provider.table';
import { Pool } from 'pg';
import * as SQLCONSTANTS from 'src/database/providers/postgres/constants';

export class DatabaseProviderSchema {
  private _tables: Array<DatabaseProviderTable>;
  private _connection_pool: Pool;

  constructor(pool: Pool) {
    // Initialise a blank array of tables to start
    this._tables = new Array<DatabaseProviderTable>();

    // Set the Database Pool we are going to use
    this._connection_pool = pool;

    // Load the tables into the Schema
    this.loadTables();
  }

  private async loadTables() {
    const response = await this._connection_pool.query(
      SQLCONSTANTS.SCHEMA_TABLE_NAMES,
    );

    response.rows.forEach((element) => {
      console.log(element);
      this.addTable(
        element.table_catalog,
        element.table_schema,
        element.table_name,
      );
    });
  }

  public addTable(databaseName: string, schemaName: string, name: string) {
    this._tables.push(
      new DatabaseProviderTable(databaseName, schemaName, name),
    );
  }

  public tables(): any {
    return this._tables;
  }

  public table(
    databaseName: string,
    schemaName: string,
    name: string,
  ): DatabaseProviderTable[] {
    return this._tables.filter((element) => {
      element.databaseName === databaseName &&
        element.schemaName === schemaName &&
        element.name == name;
    });
  }
}
