import { Injectable, Inject } from '@nestjs/common';
import { DB_CONNECTION } from './constants';
import { DatabaseProviderTable } from './providers/postgres/database.provider.table';

@Injectable()
export class DatabaseService {
  constructor(@Inject(DB_CONNECTION) private dbProvider: any) {}

  tables(): Array<DatabaseProviderTable> {
    return this.dbProvider.schema.tables();
  }
}
