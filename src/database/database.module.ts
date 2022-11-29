import { DB_CONNECTION } from './constants';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { DatabaseProvider as PostGresDatabaseProvider } from 'src/database/providers/postgres';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

const dbProvider = {
  provide: DB_CONNECTION,
  useFactory: (configService: ConfigService) => {
    /* Return the correct DB Provider
     - Based on the type that has been requested */
    if (configService.get('db_type').toUpperCase() == 'POSTGRES') {
      // We are configured to use PostGres
      return new PostGresDatabaseProvider({
        type: configService.get('db_type'),
        hostName: configService.get('db_host_name'),
        port: parseInt(configService.get('db_port')),
        databaseName: configService.get('db_database_name'),
        userName: configService.get('db_user_name'),
        password: configService.get('db_password'),
        config_service: configService,
      });
    }
  },
  // Inject the class to read the configuration
  // - as well as the Dictionary Manager
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [dbProvider, DatabaseService],
  exports: [dbProvider],
  controllers: [DatabaseController],
})
export class DBModule {}
