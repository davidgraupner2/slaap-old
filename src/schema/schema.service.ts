import {
  Injectable,
  Inject,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { DB_CONNECTION } from 'src/database/constants';
import { readFileSync } from 'fs';
import { ConfigService } from 'src/config/config.service';
import { ISchemaConfig } from './interfaces/schema.interfaces';
import { ISchemaApplication } from './interfaces';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SchemaService implements OnApplicationBootstrap, OnModuleInit {
  // Stores the Schema file to use
  private _schemaConfigurationFile: string;
  private _applications: Array<ISchemaApplication>;

  // Stores the schema that has been loaded
  private _schemaConfig: ISchemaConfig;

  // Schema service receives the Database Provider via Dependency Injection
  constructor(
    private _configService: ConfigService,
    private _databaseService: DatabaseService,
  ) {
    // Get the Schema Config File location from the config service
    this._schemaConfigurationFile =
      this._configService.configuration()['schemaConfigurationFile'];
  }

  // The NestJS Framework calls this life cycle event to initialise each module
  // - occurs before onApplicationBootstrap
  onModuleInit() {
    // Initiate the loading of the schema configuration
    this.loadSchema();
    console.log(this._schemaConfig.tables[0].columns[2].type);
    console.log(typeof this._schemaConfig);
  }

  // Load the schema from the schema config file
  private loadSchema() {
    this._schemaConfig = JSON.parse(
      readFileSync(this._schemaConfigurationFile, 'utf-8'),
    );
  }

  // The NestJS Framework calls this life cycle event after all modules have been intialised
  // - occurs after onModuleInit
  onApplicationBootstrap() {
    // // Set the Schema file to use - derived from the Config Service
    // console.log(
    //   `Schema Service received Application BootStrap Event - Starting...`,
    //   `Loading Schema from ${this._schemaConfigurationFile}`,
    //   this.loadSchema(),
    // );
    // console.log(
    //   'Schema Service received Application BootStrap Event - Started...',
    // );

    console.log();
  }
}
