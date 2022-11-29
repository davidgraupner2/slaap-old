export class DatabaseProviderTable {
  private _name: string;
  private _databaseName: string;
  private _schemaName: string;

  constructor(databaseName: string, schemaName: string, name: string) {
    this._databaseName = databaseName;
    this._schemaName = schemaName;
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get databaseName(): string {
    return this._databaseName;
  }

  public get schemaName(): string {
    return this._schemaName;
  }
}
