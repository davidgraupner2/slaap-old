// This class defines the root class for all database types

import { NumericLimit } from 'argon2';

// - other database column types should extend this type
export class DatabaseColumnTypeRoot {
  // Private properties
  private _name: string = '';
  private _type: DatabaseColumnDataTypes = DatabaseColumnDataTypes.string;
  private _comment: string = '';
  private _allow_null: boolean = true;
  private _primary_key: boolean = false;
  private _length: number = 0;
  private _identity: boolean = false;

  constructor(
    name: string,
    type: DatabaseColumnDataTypes = DatabaseColumnDataTypes.string,
    comment: string = '',
    allowNull: boolean = true,
    primary_key: boolean = false,
    length: number = 25,
    identity: boolean = false,
  ) {
    // Set the private properties to the values passed in, in the constructor
    this._name = name;
    this._type = type;
    (this._comment = comment), (this._allow_null = allowNull);
    this._primary_key = primary_key;
    this._length = length;
    this._identity = identity;
  }

  protected get name(): string {
    return this._name;
  }

  protected set name(newName: string) {
    this._name = newName;
  }
}
