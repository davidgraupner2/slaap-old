import { DatabaseColumnTypeInterface } from './database.column.type.interface';
import { DatabaseColumnDataTypes } from './database.enums';

export class DatabaseColumnType<T> implements DatabaseColumnTypeInterface {
  // Properties that must be visible on the interface
  readonly columnName: string;
  readonly comment: string;
  readonly value: any;

  type: DatabaseColumnDataTypes;

  // Methods that must be visible on the interface
  selectQuery(): string {
    return 'well hello there';
  }
}
