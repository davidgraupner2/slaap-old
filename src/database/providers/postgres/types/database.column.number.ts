import { DatabaseColumn } from './database.column';
import { EnumDatabaseColumnDataTypes } from '../enums/database.enums';

// export class DatabaseColumnNumber extends DatabaseColumn {
//   /*
//   Call the base class constructor passing in some default values such as type
//   */
//   constructor(
//     columnName: string,
//     columnComment?: string,
//     columnValue?: number,
//   ) {
//     super(
//       columnName,
//       EnumDatabaseColumnDataTypes.number,
//       columnComment,
//       columnValue,
//     );
//   }

//   //Overide the getter for value - "number" type, not "any"
//   public override get value(): number {
//     return this.value;
//   }

//   //Overide the setter for value - "number" type, not "any"
//   public override set value(value: number) {
//     this.value = value;
//   }
// }
