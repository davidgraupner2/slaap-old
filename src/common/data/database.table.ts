import { Timestamp } from 'rxjs';
import { urlToHttpOptions } from 'url';
import { DatabaseColumn } from './database.column';
import { DatabaseColumns } from './database.columns';

export class DataBaseTable {
  // Common Table variables
  private _name: string;
  private _columns: DatabaseColumns;
  private _id: number;
  private _created: number;
  private _updated: number;
  private _created_by: number;
  private _updated_by: number;
  private _alias: string;
  private _description: string;
  private _default_schema: string = 'public';

  constructor(
    name: string,
    alias: string = '',
    descripion: string = '',
    id: number = 0,
    created: number = 0,
    updated: number = 0,
    created_by: number = 0,
    updated_by: number = 0,
  ) {
    // Set the tableName and other attributes passed in
    this._name = name;
    this._alias = alias;
    this._description = descripion;
    (this._id = id), (this._created = created);
    this._updated = updated;
    this._created_by = created_by;
    this._updated_by = updated_by;

    // Create a new instance of the DB Columns
    this._columns = new DatabaseColumns();
  }

  public get name() {
    return this._name;
  }

  public set name(newTableName: string) {
    this._name = newTableName;
  }

  // Provide access to the Columns
  public columns() {
    return this._columns;
  }

  // Provide access to a specific column
  public column(columnName: string): DatabaseColumn {
    return this._columns.get(columnName);
  }

  // Returns the select statement based on the current data loaded
  public selectQuery() {
    return `select ${this._columns.toString()} from ${this._name}`;
  }
}
