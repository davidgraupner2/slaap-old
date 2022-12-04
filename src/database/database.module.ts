import { Inject, Module, Logger, Global } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [
    // Dynamically create the Database Provider we will be using
    // - Passing in the ConfigService so that we can read the config from the environment
    //
    // - We are using knexjs - https://knexjs.org/
    // - Its provides good features such as migration and seeding but also dyanamic SQL Query building for multiple databases
    KnexModule.forRootAsync({
      useFactory: (configService: ConfigService, logger: Logger) => ({
        config: {
          client: configService.get('db_client'),
          debug: configService.get('db_debug') === 'true',
          pool: {
            min: parseInt(configService.get('db__pool_min_connections')),
            max: parseInt(configService.get('db__pool_max_connections')),
          },
          connection: {
            database: configService.get('db_database_name'),
            user: configService.get('db_user_name'),
            password: configService.get('db_password'),
            host: configService.get('db_host_name'),
            port: configService.get('db_port'),
          },
          searchPath: ['public'],
          // Redirect KnexJS Logs to our logger instance - rather than console
          log: {
            warn(message) {
              logger.warn(message, 'KnexDbService');
            },
            error(message) {
              logger.error(message, 'KnexDbService');
            },
            deprecate(message) {
              logger.verbose(message, 'KnexDbService');
            },
            debug(message) {
              logger.debug(message, 'KnexDbService');
            },
          },
        },
      }),
      // Inject the ConfigService, so we can read the
      // required DB Config
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService, Logger],
  controllers: [],
  exports: [DatabaseService],
})
export class DatabaseModule {}
