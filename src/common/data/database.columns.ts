import { DatabaseColumnTypeInterface } from './types/database.column.type.interface';
import { DatabaseColumnTypeString } from './types/database.column.type.string';

export class DatabaseColumns<T extends DatabaseColumnTypeInterface> {
  // Store an array of Database Columns
  private _columns: Array<T>;

  constructor() {
    // Initialise a new blank array of database tables
    this._columns = new Array<T>();

    // By default - add a wildcard as the first column
    // this.add('*');
  }

  // Add a new database column into the array
  public add(column: T): void {
    if (this._columns.some((element) => element.name === column.name)) {
      // don't add duplicates
      return;
    }

    // If we get here, it does not exist - add it
    this._columns.push(column);

    // if we have more than 1 column and there is a wildcard column, remove it
    if (this._columns.length > 1) {
      this.remove('*');
    }
  }

  // Removes an element from the columns array
  // - if it matches the column name passed in
  public remove(columnName: string): void {
    for (var index = 0; index < this._columns.length; index++) {
      if (this._columns[index].name === columnName) {
        this._columns.splice(index, 1);
      }
    }
  }

  // Return the DatabaseColumn that matches the column name passed in
  public get(columnName: string): DatabaseColumnTypeInterface {
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
