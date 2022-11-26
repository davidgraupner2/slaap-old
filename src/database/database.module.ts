import { DB_CONNECTION, DICTIONARY_MANAGER } from './constants';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { PostGresDBProvider } from './providers';
import { PostgresDictionaryManager } from './dictionary_managers';

const dbProvider = {
  provide: DB_CONNECTION,
  useFactory: (
    configService: ConfigService,
    dictmanager: PostgresDictionaryManager,
  ) => {
    /* Return the correct DB Provider
     - Based on the type that has been requested */
    if (configService.get('db_type').toUpperCase() == 'POSTGRES') {
      // We are concifured to use PostGres
      return new PostGresDBProvider({
        type: configService.get('db_type'),
        hostName: configService.get('db_host_name'),
        port: parseInt(configService.get('db_port')),
        databaseName: configService.get('db_database_name'),
        userName: configService.get('db_user_name'),
        password: configService.get('db_password'),
        dictionary_manager: dictmanager,
      });
    }
  },
  // Inject the class to read the configuration
  // - as well as the Dictionary Manager
  inject: [ConfigService, PostgresDictionaryManager],
};

@Global()
@Module({
  providers: [dbProvider, PostgresDictionaryManager],
  exports: [dbProvider, PostgresDictionaryManager],
})
export class DBModule {}
