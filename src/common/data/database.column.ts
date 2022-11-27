export class DatabaseColumn {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  public get name() {
    return this._name;
  }

  public set name(newName: string) {
    this._name = newName;
  }
}
