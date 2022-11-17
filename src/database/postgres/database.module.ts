import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from './constants';
import { DatabaseService } from './database.service';

const dbProvider = {
  provide: PG_CONNECTION,

  // Allows us to get the dependency
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'slaap',
    port: '5434',
    password: 'sIrlk46Wlxa73jirI@rO',
  }),
};

// Register the provider wirth NestJS and export it
// so it can be used by Dependency Injection
@Global()
@Module({
  providers: [dbProvider, DatabaseService],
  exports: [dbProvider, DatabaseService],
})
export class DbModule {}
