// import { DatabaseColumnTypeRoot } from './database.column.type.root';
// import { DatabaseColumnDataTypes } from './database.enums';

import { DatabaseColumnTypeInterface } from './database.column.type.interface';
import { DatabaseColumnDataTypes } from './database.enums';

// // String Database Type
// export class DatabaseColumnTypeNumber extends DatabaseColumnTypeRoot {
//   constructor(name: string, comment: string, length: number, value: number) {
//     // Setup the parameters for a string data type
//     super(
//       name,
//       DatabaseColumnDataTypes.string,
//       comment,
//       false,
//       false,
//       length,
//       false,
//       value,
//     );
//   }

//   // Override the getters / setters we want to expose
//   public override get name(): string {
//     return this.name;
//   }

//   public override set name(newName: string) {
//     this.name = newName;
//   }

//   public override get comment(): string {
//     return this.comment;
//   }

//   public override set comment(newComment: string) {
//     this.comment = newComment;
//   }

//   public override get type(): DatabaseColumnDataTypes {
//     return this.type;
//   }

//   public override get length(): number {
//     return this.length;
//   }

//   public override set length(newLength: number) {
//     this.length = newLength;
//   }
// }

export class DatabaseColumnTypeNumber
  implements DatabaseColumnTypeInterface<DatabaseColumnTypeNumber>
{
  columnName: string;
  comment: string;
  value: any;
  type: DatabaseColumnDataTypes;

  constructor(name: string) {
    this.columnName = name;
  }

  opp2() {
    console.log('opp2');
  }

  selectQuery(): string {
    throw new Error('Method not implemented.');
  }
}
