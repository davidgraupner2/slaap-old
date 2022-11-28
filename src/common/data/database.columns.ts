import { IDatabaseColumn } from '../../database/interfaces/database.column.interfaces';
import { DatabaseColumn } from 'src/database/providers/postgres/types';

export class DatabaseColumns {
  // Store an array of Database Columns
  private _columns: Array<DatabaseColumn>;

  constructor() {
    // Initialise a new blank array of database columns
    this._columns = new Array<DatabaseColumn>();

    // By default - add a wildcard as the first column
    // this.add('*');
  }

  // Add a new database column into the array
  public add(column: DatabaseColumn): DatabaseColumn {
    /* 
    If the same column, as one that already exists has been provided,
    ensure its removed before adding this one
    */
    this.remove(column);

    // Add the new column
    this._columns.push(column);

    // Return the column - so more changed could be made to it
    return column;
  }

  // Removes an element from the columns array
  // - if it matches the column name passed in
  // Return the new array with the column removed
  public remove(column: DatabaseColumn): void {
    this._columns = this._columns.filter((item) => {
      item.name !== column.name;
    });
  }

  public get length(): number {
    return this._columns.length;
  }

  // Gets a specific column by name
  public get(columnName: string): DatabaseColumn {
    return this._columns.find((element) => element.name === columnName);
  }

  // Convert the list of columns into a comma seperated list
  public toString(): string {
    let retString: string = '';

    // Loop through the database columns and build the string
    this._columns.forEach((column) => {
      retString += column.name + ',';
    });

    // Remove the trailing comma before returning the string
    if (retString.length > 0) {
      return retString.slice(0, retString.length - 1);
    } else {
      return retString;
    }
  }

  // Returns the list of columns in this column list
  public columnList() {
    if (this._columns.length === 0) {
      return '*';
    } else {
      return String(this._columns.map((column) => column.name));
    }
  }
}
