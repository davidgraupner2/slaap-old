import { DB_CONNECTION } from './constants';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { PostGresDBProvider } from './providers';

const dbProvider = {
  provide: DB_CONNECTION,
  useFactory: (configService: ConfigService) => {
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
      });
    }
  },
  inject: [ConfigService],
};

@Global()
@Module({
  // imports: [ConfigModule],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DBModule {}
