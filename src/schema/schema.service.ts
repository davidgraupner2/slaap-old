import { Injectable, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { DB_CONNECTION } from 'src/database/constants';
import { fstat, readFile, readFileSync } from 'fs';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class SchemaService implements OnApplicationBootstrap {
  // Stores the Schema file to use
  private _schemaConfigurationFile: string;

  // Schema service receives the Database Provider via Dependency Injection
  constructor(
    @Inject(DB_CONNECTION) private _dbProvider: any,
    private _configService: ConfigService,
  ) {}

  private loadSchema() {
    const schema = JSON.parse(
      readFileSync(this._schemaConfigurationFile, 'utf-8'),
    );
    console.log(typeof schema, schema.tables[0]);
  }

  onApplicationBootstrap() {
    // Set the Schema file to use - derived from the Config Service
    this._schemaConfigurationFile =
      this._configService.configuration()['schemaConfigurationFile'];

    console.log(
      `Schema Service received Application BootStrap Event - Starting...`,
      `Loading Schema from ${this._schemaConfigurationFile}`,
      this.loadSchema(),
    );
    console.log(
      'Schema Service received Application BootStrap Event - Started...',
    );
  }
}
