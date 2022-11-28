import { EnumDatabaseColumnDataTypes } from '../providers/postgres/enums/database.enums';

export interface IDatabaseColumn {
  /* 
  Properties that must be visible on the interface
  */
  name: string;
  comment: string;
  value: any;
  readonly type: EnumDatabaseColumnDataTypes;
}
