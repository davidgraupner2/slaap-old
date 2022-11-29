import { Inject } from '@nestjs/common';
import { DB_CONNECTION } from 'src/database/constants';
import { ConfigService } from 'src/config/config.service';
import { DatabaseService } from 'src/database/database.service';

export class PostGresSchemaProvider {
  constructor(
    private configService: ConfigService,
    private databaseService: DatabaseService,
  ) {}
}
