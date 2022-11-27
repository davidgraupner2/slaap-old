import { DatabaseColumnTypeRoot } from './database.column.type.root';

// String Database Type
export class DatabaseColumnTypeString extends DatabaseColumnTypeRoot {
  constructor(
    name: string,
    comment: string,
    length: number,
    allowNull: boolean,
    value?: string,
  ) {
    // Setup the parameters for a string data type
    super(
      name,
      DatabaseColumnDataTypes.string,
      comment,
      allowNull,
      false,
      length,
      false,
      value,
    );
  }

  // Override the getters / setters we want to expose
  public override get name(): string {
    return this.name;
  }

  public override set name(newName: string) {
    this.name = newName;
  }

  public override get comment(): string {
    return this.comment;
  }

  public override set comment(newComment: string) {
    this.comment = newComment;
  }

  public override get type(): DatabaseColumnDataTypes {
    return this.type;
  }

  public override get allowNull(): boolean {
    return this.allowNull;
  }

  public override set allowNull(newAllowNull: boolean) {
    this.allowNull = newAllowNull;
  }

  public override get length(): number {
    return this.length;
  }

  public override set length(newLength: number) {
    this.length = newLength;
  }
}
