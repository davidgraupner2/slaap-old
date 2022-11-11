import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from './constants';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'slaap',
    port: '5434',
    password: 'sIrlk46Wlxa73jirI@rO',
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
