// import { DatabaseColumn } from './database.column';
// import { EnumDatabaseColumnDataTypes } from '../enums/database.enums';

// export class DatabaseColumnIdentity extends DatabaseColumn {
//   /*
//   Call the base class constructor passing in all default values
//   */
//   constructor() {
//     super(
//       'id',
//       EnumDatabaseColumnDataTypes.identity,
//       'Primary key and Identity',
//       0,
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
