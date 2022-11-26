import { TDBFieldAndValue } from '../interfaces';

class databaseColumn {
  name: string = '';

  constructor(name: string) {
    this.name = name;
  }
}

class databaseColumns {
  // Private variable to store the array of columns
  private columns: Array<databaseColumn>;

  constructor() {
    // Initialise a new blank array of database tables
    this.columns = new Array<databaseColumn>();
  }

  // Add a new database column to the columns list
  add(databaseColumn: databaseColumn): databaseColumns {
    // If the database column already exists - don't add it again
    if (this.columns.some((element) => element.name === databaseColumn.name)) {
      return;
    }

    // If we get here, it does not exist - add it
    this.columns.push(databaseColumn);

    // if we have more than 1 column and there is a wilcard column, remove it
    if (this.columns.length > 1) {
      this.remove('*');
    }

    return this;
  }

  remove(name) {
    return this.columns.filter((element) => {
      return element.name != name;
    });
  }

  // Convert the list of columns into a comma seperated list
  tostring() {
    let retString: string = '';

    // Loop through the database columns and build the string
    this.columns.forEach((column) => {
      retString += column.name + ',';
    });

    // Remove the trailing comma before returng the string
    if (retString.length > 0) {
      return retString.slice(0, retString.length - 1);
    } else {
      return retString;
    }
  }
}

export class findMany {
  // Local properties we need
  private columns: databaseColumns;
  private tableName = '';
  private whereClause = [];
  private orderByColumns = [];

  constructor(tableName: string) {
    // Update local properties with values passed in
    this.tableName = tableName;

    this.columns = new databaseColumns().add(new databaseColumn('*'));
    this.columns.add(new databaseColumn('*'));
    this.columns.add(new databaseColumn('*'));
    this.columns.add(new databaseColumn('Any'));
    this.columns.add(new databaseColumn('*'));
  }

  addColumn(name: string): findMany {
    // Add the column to the column list - if its not there already
    this.columns.add(new databaseColumn(name));

    return this;
  }

  where(params: TDBFieldAndValue): findMany {
    // Add a (AND) whereclause to the list
    if (!this.whereClause) {
      this.whereClause.push(`${params.fieldName} = ${params.fieldValue}`);
    } else {
      this.whereClause.push(`and ${params.fieldName} = ${params.fieldValue}`);
    }

    return this;
  }

  addOr(fieldName: string, value: any): findMany {
    // Add a (OR) whereclause to the list
    if (!this.whereClause) {
      this.whereClause.push(`${fieldName} = ${value}`);
    } else {
      this.whereClause.push(`or ${fieldName} = ${value}`);
    }

    return this;
  }

  whereclause() {
    if (this.where.length == 0) {
      return '';
    } else {
      return ` where ${String(this.where)}`;
    }
  }

  orderBy(fieldName: string, sort_direction: string = 'ASC') {
    if (!this.orderByColumns.includes(`${fieldName} ${sort_direction}`)) {
      this.orderByColumns.push(`${fieldName} ${sort_direction}`);
    }
  }

  execute() {
    console.log(this.columns.tostring());
    console.log(
      'Executing: ' +
        `select ${this.columns.tostring()} from ${this.tableName} ${
          this.whereClause
        }`,
    );
  }
}
