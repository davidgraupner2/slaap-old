import { ConsoleLogger } from '@nestjs/common';
import { DatabaseColumnTypeInterface } from './database.column.type.interface';
import { DatabaseColumnDataTypes } from './database.enums';

export class DatabaseColumnTypeString
  implements DatabaseColumnTypeInterface<DatabaseColumnTypeString>
{
  constructor(
    private name: string,
    comment: string,
    length: number,
    allowNull: boolean,
    value?: string,
  ) {}

  value: any;
  selectQuery(): string {
    throw new Error('Method not implemented.');
  }

  opp() {
    console.log('opp');
  }

  public get type(): DatabaseColumnDataTypes {
    return DatabaseColumnDataTypes.string;
  }

  public get columnName(): string {
    return this.name;
  }

  public set columnName(newName: string) {
    this.name = newName;
  }

  public get comment(): string {
    return this.comment;
  }

  public set comment(newComment: string) {
    this.comment = newComment;
  }

  public get allowNull(): boolean {
    return this.allowNull;
  }

  public set allowNull(newAllowNull: boolean) {
    this.allowNull = newAllowNull;
  }

  public get length(): number {
    return this.length;
  }

  public set length(newLength: number) {
    this.length = newLength;
  }
}
