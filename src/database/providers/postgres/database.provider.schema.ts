import { DatabaseProviderTable } from './database.provider.table';
import { Pool } from 'pg';
import * as SQLCONSTANTS from 'src/database/providers/postgres/constants';
import {
  IDatabaseDictionaryManager,
  ISchemaManager,
  IDatabaseTable,
} from 'src/database/interfaces';

export class DatabaseProviderSchema implements ISchemaManager {
  private _tables: Array<IDatabaseTable>;
  private _connection_pool: Pool;

  constructor(pool: Pool) {
    // Initialise a blank array of tables to start
    this._tables = new Array<IDatabaseTable>();

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

  public addTable(
    databaseName: string,
    schemaName: string,
    name: string,
    inheritsFrom?: string,
  ): IDatabaseTable {
    // Create the new table object
    const new_table = new DatabaseProviderTable(databaseName, schemaName, name);

    // Add the new table object to the collection
    this._tables.push(new_table);

    return new_table;
  }

  public get tables(): Array<IDatabaseTable> {
    return this._tables;
  }

  public table(
    databaseName: string,
    schemaName: string,
    name: string,
  ): IDatabaseTable {
    return this._tables.find((element) => {
      element.databaseName === databaseName &&
        element.schemaName === schemaName &&
        element.name == name;
    });
  }
}
