import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { AuthController } from './auth/auth.controller';
// import { AuthModule } from './auth/auth.module';
// import { AuthService } from './auth/auth.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CONFIG_OPTIONS } from './config/constants';
import { DBModule } from './database/database.module';
// import { DB_CONNECTION } from './database/constants';
// import { DBModule, dbProvider } from './database/database.module';
// import { DatabaseService } from './database/database.service';
// import { DbModule } from './database/postgres/database.module';
// import { DatabaseService } from './database/postgres/database.service';

@Module({
  imports: [
    AuthModule,
    // DBModule,
    ConfigModule.register({ folder: './config' }),
    DBModule,
  ],
  controllers: [AppController],
  // controllers: [AppController, AuthController],
  providers: [AppService],
  // providers: [AppService, AuthService],
})
export class AppModule {}
