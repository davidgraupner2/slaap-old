import { Inject, Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { env } from 'process';
import { CONFIG_OPTIONS } from './constants';
import {
  EnvConfig,
  TConfiguration,
  ConfigOptions,
} from 'src/config/interfaces';
import { loggers } from 'winston';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;
  private _environment: string;
  private _configurationFolder: string;
  private _platformConfigurationFile: string;
  private _schemaConfigurationFile: string;

  // Config Options are injected into this Service via the dynamioModule
  // defines in the Config Module 'config.module.ts'
  constructor(
    @Inject(CONFIG_OPTIONS) options: ConfigOptions,
    private readonly logger: Logger,
  ) {
    // Get the environment we are currently running in
    // - 'development' - if not set
    this._environment = `${process.env.NODE_ENV || 'development'}`;

    // Get the folder where the configuration for the environment is stored
    this._configurationFolder = path.resolve(
      __dirname,
      '../../',
      options.folder,
      this._environment,
    );

    // Get the main .env file we will use for configuration
    this._platformConfigurationFile = path.resolve(
      this._configurationFolder,
      'platform.env',
    );

    // Load the environment file into ram
    this.envConfig = dotenv.parse(
      fs.readFileSync(this._platformConfigurationFile),
    );
  }

  // Method to get config values, from the config file.
  // - These are currently in RAM - read in from the constructor
  get(key: string): string {
    return this.envConfig[key];
  }

  // Provides the platform configuration to all who need it
  public configuration(): TConfiguration {
    return {
      environment: this._environment,
      configurationFolder: this._configurationFolder,
      platformConfigurationFile: this._platformConfigurationFile,
    };
  }
}
