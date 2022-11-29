import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';
import { EnvConfig, ConfigOptions } from './interfaces';
import { ConfigController } from './config.controller';

@Global()
@Module({
  controllers: [ConfigController]
})
export class ConfigModule {
  static register(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
