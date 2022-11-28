import { DatabaseColumn } from './database.column';
import { EnumDatabaseColumnDataTypes } from '../enums/database.enums';

export class DatabaseColumnString extends DatabaseColumn {
  /* 
  Call the base class constructor passing in some default values such as type
  */
  constructor(
    columnName: string,
    columnComment?: string,
    columnValue?: string,
  ) {
    super(
      columnName,
      EnumDatabaseColumnDataTypes.string,
      columnComment,
      columnValue,
    );
  }

  //Overide the getter for value - "string" type, not "any"
  public override get value(): string {
    return this.value;
  }

  //Overide the setter for value - "string" type, not "any"
  public override set value(value: string) {
    this.value = value;
  }
}
