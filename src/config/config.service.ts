import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './constants';
import { EnvConfig, ConfigOptions } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  // Config Options are injected into this Service via the dynamioModule
  // defines in the Config Module 'config.module.ts'
  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    // Set the filepath to the configured environment using the 'NODE_ENV' environment variable
    // - Use development, if this environment variable is not set
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;

    // Set the location of the configuration file - using the folder passed in
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);

    // Load the environment file into ram
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  // Method to get config values, from the config file.
  // - These are currently in RAM - read in from the constructor
  get(key: string): string {
    return this.envConfig[key];
  }
}
