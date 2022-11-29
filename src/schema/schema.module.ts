import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';
import { SCHEMA_PROVIDER } from './constants';
import { ConfigService } from 'src/config/config.service';
import { PostGresSchemaProvider } from './providers/postgres/schema.provider';

const schemaProvider = {
  provide: SCHEMA_PROVIDER,
  useFactory: (
    configService: ConfigService,
    databaseService: DatabaseService,
  ) => {
    /* Return the correct Schema Provider
     - Based on the type that has been configured */
    if (configService.get('db_type').toUpperCase() == 'POSTGRES') {
      // We are configured to use PostGres
      return new PostGresSchemaProvider(configService, databaseService);
    }
  },
  // Inject the class to read the configuration
  // - as well as the Dictionary Manager
  inject: [ConfigService, DatabaseService],
};

@Module({
  controllers: [SchemaController],
  providers: [SchemaService, DatabaseService],
})
export class SchemaModule {}
