import { IDatabaseColumn } from 'src/database/interfaces';
import { EnumDatabaseColumnDataTypes } from '../enums/database.enums';

export class DatabaseColumn implements IDatabaseColumn {
  constructor(
    private columnName: string,
    private columnType: string,
    private columnOrdinalPosition: number,
    private columnDescription?: string,
    private columnValue?: any,
  ) {}

  public get name(): string {
    return this.columnName;
  }

  public set name(name: string) {
    this.columnName = name;
  }

  public get type(): string {
    return this.columnType;
  }

  public get value(): any {
    return this.columnValue;
  }

  public set value(value: any) {
    this.columnValue = value;
  }

  public get description(): string {
    return this.columnDescription;
  }

  public set description(comment: string) {
    this.columnDescription = comment;
  }

  public get ordinalPosition(): number {
    return this.columnOrdinalPosition;
  }

  public set ordinalPosition(ordinalPosition: number) {
    this.columnOrdinalPosition = ordinalPosition;
  }
}
