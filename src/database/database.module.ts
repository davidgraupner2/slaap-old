import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from './constants';

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
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
