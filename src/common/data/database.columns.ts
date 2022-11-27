import { elementAt } from 'rxjs';
import { DatabaseColumn } from './database.column';

export class DatabaseColumns {
  // Store an array of Database Columns
  private _columns: Array<DatabaseColumn>;

  constructor() {
    // Initialise a new blank array of database tables
    this._columns = new Array<DatabaseColumn>();

    // By default - add a wildcard as the first column
    this.add('*');
  }

  // Add a new database column into the array
  public add(columnName: string): DatabaseColumns {
    if (this._columns.some((element) => element.name === columnName)) {
      // don't add duplicates
      return;
    }

    // If we get here, it does not exist - add it
    this._columns.push(new DatabaseColumn(columnName));

    // if we have more than 1 column and there is a wildcard column, remove it
    if (this._columns.length > 1) {
      this.remove('*');
    }

    return this;
  }

  // Removes an element from the columns array
  // - if it matches the column name passed in
  public remove(columnName: string): DatabaseColumns {
    for (var index = 0; index < this._columns.length; index++) {
      if (this._columns[index].name === columnName) {
        this._columns.splice(index, 1);
      }
    }

    return this;
  }

  // Return the DatabaseColumn that matches the column name passed in
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
}
