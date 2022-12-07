export class genericColumn {
  name: string;
  value: any;
}

export class genericRecord {
  public columns: Array<genericColumn>;

  constructor() {
    this.columns = new Array<genericColumn>();
  }

  public getColumnValue(name: string): any {
    this.columns.forEach((column) => {
      if (column.name === name) {
        return column.value;
      }
    });
  }

  public addColumn(name: string, value: any) {
    this.columns.forEach((column) => {
      if (column.name === name) {
        column.value = value;
        return;
      }
    });

    const column = new genericColumn();
    column.name = name;
    column.value = value;
    this.columns.push(column);
  }
}
