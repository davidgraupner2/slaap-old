// import { DatabaseColumnTypeRoot } from './database.column.type.root';
// import { DatabaseColumnDataTypes } from './database.enums';

// // Identity Database Type
// export class DatabaseColumnTypeIdentity extends DatabaseColumnTypeRoot {
//   constructor() {
//     // default most of the parameters in the super class as we are opininionated as to how best to setup this type
//     // - We are effectively deciding for ourselves how to setup the identity column
//     super(
//       'id',
//       DatabaseColumnDataTypes.integer,
//       'Primary key and Identifier',
//       false,
//       true,
//       0,
//       true,
//       '',
//     );
//   }

//   // Override the getters to make them available to the caller
//   // - We don't expose the setters as we don't want the values changed
//   public override get name(): string {
//     return this.name;
//   }

//   public override get comment(): string {
//     return this.comment;
//   }

//   public override get type(): DatabaseColumnDataTypes {
//     return this.type;
//   }

//   public override get allowNull(): boolean {
//     return this.allowNull;
//   }

//   public override get primaryKey(): boolean {
//     return this.primaryKey;
//   }

//   public override get identity(): boolean {
//     return this.identity;
//   }
// }
