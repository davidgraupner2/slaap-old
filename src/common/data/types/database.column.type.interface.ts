import { DatabaseColumnDataTypes } from './database.enums';

export interface DatabaseColumnTypeInterface {
  // Properties that must be visible on the interface
  readonly name: string;
  readonly comment: string;
  readonly value: any;
  readonly type: DatabaseColumnDataTypes;

  // Methods that must be visible on the interface
  selectQuery(): string;
}
