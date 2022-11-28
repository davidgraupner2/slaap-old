import { IDatabaseColumn } from 'src/database/interfaces';
import { EnumDatabaseColumnDataTypes } from '../enums/database.enums';

export class DatabaseColumn implements IDatabaseColumn {
  constructor(
    private columnName: string,
    private columnType: EnumDatabaseColumnDataTypes,
    private columnComment?: string,
    private columnValue?: any,
  ) {}

  public get name(): string {
    return this.columnName;
  }

  public set name(name: string) {
    this.columnName = name;
  }

  public get type(): EnumDatabaseColumnDataTypes {
    return this.columnType;
  }

  public get value(): any {
    return this.columnValue;
  }

  public set value(value: any) {
    this.columnValue = value;
  }

  public get comment(): string {
    return this.columnComment;
  }

  public set comment(comment: string) {
    this.columnComment = comment;
  }
}
