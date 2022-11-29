import { Pool } from 'pg';
import { IDatabaseColumn, IDatabaseTable } from 'src/database/interfaces';
import * as SQLCONSTANTS from 'src/database/providers/postgres/constants';
import { DatabaseColumn } from './types';

export class DatabaseProviderTable implements IDatabaseTable {
  private _name: string;
  private _databaseName: string;
  private _schemaName: string;
  private _connection_pool: Pool;

  // private _columns: Array<IDatabaseColumn>;

  constructor(
    databaseName: string,
    schemaName: string,
    name: string,
    pool: Pool,
  ) {
    this._databaseName = databaseName;
    this._schemaName = schemaName;
    this._name = name;
    this._connection_pool = pool;

    // Save the Database Connection Pool to use
    // this._connection_pool = pool;

    // Initialise the array of columns
    // this._columns = new Array<IDatabaseColumn>();

    // Load the columns for this table
    // this.loadColumns();
  }

  // public get columns(): IDatabaseColumn[] {
  //   return this._columns;
  // }

  // private async loadColumns() {
  //   let sql = SQLCONSTANTS.SCHEMA_COLUMNS.replace('?', this._name);

  //   const response = await this._connection_pool.query(
  //     SQLCONSTANTS.SCHEMA_COLUMNS.replace('?', this._name),
  //   );

  //   response.rows.forEach((element) => {
  //     this.addColumn(
  //       element.column_name,
  //       element.data_type,
  //       element.ordinal_position,
  //     );
  //   });
  // }

  // public addColumn(
  //   columnName: string,
  //   columnType: string,
  //   ordinalPosition: number,
  // ): IDatabaseColumn {
  //   // Create the new column object
  //   const new_column = new DatabaseColumn(
  //     columnName,
  //     columnType,
  //     ordinalPosition,
  //   );

  //   // Add the new table object to the collection
  //   this._columns.push(new_column);

  //   return new_column;
  // }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get databaseName(): string {
    return this._databaseName;
  }

  public get schemaName(): string {
    return this._schemaName;
  }

  // public get boo(): string {
  //   return 'BOO!';
  // }
}
