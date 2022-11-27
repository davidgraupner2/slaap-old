// This class defines the root class for all database types
// - other database column types should extend this type
export abstract class DatabaseColumnTypeRoot {
  constructor(
    private _name: string,
    private _type: DatabaseColumnDataTypes = DatabaseColumnDataTypes.string,
    private _comment: string = '',
    private _allowNull: boolean = true,
    private _primary_key: boolean = false,
    private _length: number = 25,
    private _identity: boolean = false,
    private _value: any,
  ) {}

  public get name(): string {
    return this._name;
  }

  protected set name(newName: string) {
    this._name = newName;
  }

  protected get comment(): string {
    return this._comment;
  }

  protected set comment(newComment: string) {
    this._comment = newComment;
  }

  protected get type(): DatabaseColumnDataTypes {
    return this._type;
  }

  protected set type(newType: DatabaseColumnDataTypes) {
    this._type = newType;
  }

  protected get allowNull(): boolean {
    return this._allowNull;
  }

  protected set allowNull(newAllowNull: boolean) {
    this._allowNull = newAllowNull;
  }

  protected get primaryKey(): boolean {
    return this._primary_key;
  }

  protected set primaryKey(newPrimaryKey: boolean) {
    this._primary_key = newPrimaryKey;
  }

  protected get length(): number {
    return this._length;
  }

  protected set length(newLength: number) {
    this._length = newLength;
  }

  protected get identity(): boolean {
    return this._identity;
  }

  protected set identity(newIdentity: boolean) {
    this._identity = newIdentity;
  }

  protected get value(): any {
    return this._value;
  }

  protected set value(newValue: any) {
    this._value = newValue;
  }
}
