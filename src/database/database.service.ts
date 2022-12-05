import { Injectable, Logger, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { ConfigService } from 'src/config/config.service';

enum columnType {
  boolean,
  string,
  timestamp,
}

class databaseColumn {
  private _name: string;
  private _columnType: columnType;

  constructor(name: string, type: columnType) {
    this._name = name;
    this._columnType = type;
  }

  public get name(): string {
    return this._name;
  }

  public get columnType(): columnType {
    return this._columnType;
  }
}

const usercolumns = [new databaseColumn('firstName', columnType.string), new databaseColumn('lastName', columnType.string)];

@Injectable()
export class DatabaseService {
  /*
   Inject knexjs into the service
   see: https://knexjs.org/guide/
  */
  constructor(@InjectModel() private readonly knex: Knex, private logger: Logger, private configService: ConfigService) {}

  private createSchema(schemaName: string) {
    /* 
    Creates a new DB Schema - if it does not already exist
    */

    this.logger.debug(`*** Creating Database Schema -> ${schemaName}`);

    this.knex.schema
      .createSchemaIfNotExists(schemaName)
      .then(() => {
        this.logger.debug(`*** Created Database Schema -> ${schemaName}`);
      })
      .catch((error) => {
        this.logger.error(`*** Creating Database Schema -> ${schemaName} - Error: ${error}`);
      });
  }

  private getcolumn(tableName: string, table: Knex.CreateTableBuilder | Knex.AlterTableBuilder, column: databaseColumn) {
    if (column.columnType == columnType.string) {
      table.string(column.name);
    }
  }

  private ensureTable(schemaName: string, tableName: string, columns: Array<databaseColumn>) {
    this.logger.debug(`*** Checking Database Table -> ${schemaName}.${tableName}`);

    this.knex.schema
      .withSchema(schemaName)
      .hasTable(tableName)
      .then((tableExists) => {
        if (tableExists) {
          /*
          This table already exists - update
          */
          this.logger.debug(`*** Updating Database Table -> ${schemaName}.${tableName}`);

          return this.knex.schema.withSchema(schemaName).table(tableName, (table) => {
            columns.forEach((column) => {
              this.getcolumn(tableName, table, column);
            });
          });
        } else {
          /*
          This table does not already exist - create
          */
          this.logger.debug(`*** Creating Database Table -> ${schemaName}.${tableName}`);
          return this.knex.schema.withSchema(schemaName).createTable(tableName, (table) => {
            columns.forEach((column) => {
              this.getcolumn(tableName, table, column);
            });
          });
        }
      });
  }

  public createAuthTables() {
    /*
    Creates the tables we will use for authentication across the platform
    - These are created in the Auth Schema 
    */

    // Get the required schema name for auth tables
    const auth_schema_name = this.configService.get('auth_schema_name');

    this.logger.verbose('*** Creating Database Tables -> Auth ***');

    this.createSchema(auth_schema_name);

    const users = this.ensureTable(auth_schema_name, 'users', usercolumns);

    console.log('Users:' + users);

    // this.knex.schema
    //   .createSchemaIfNotExists(this.configService.get('auth_schema_name'))
    //   .then(function () {
    //     /*
    //     Executed when the auth schema is created
    //     */
    //     this.logger.verbose(
    //       `${this.configService.get(
    //         'auth_schema_name',
    //       )} Schema created sucessfully`,
    //     );
    //   })
    //   .catch((error) => {
    //     this.logger.error(
    //       `${this.configService.get(
    //         'auth_schema_name',
    //       )} Could not be created sucessfully - Error: ${error}`,
    //     );
    //   })
    //   .finally(() => {
    //     this.logger.error(
    //       `${this.configService.get(
    //         'auth_schema_name',
    //       )} exists - continueing to create Auth Tables`,
    //     );
    //   });
  }

  //   onModuleInit() {
  //     console.log('Starting', this);

  //     this.createDefaultTables();

  //     // this.knex.schema
  //     //   .createTable('testers', function (table) {
  //     //     table.increments('id');
  //     //     table.string('firstName', 255).notNullable();
  //     //     table.string('lastName', 255).notNullable();
  //     //     table.string('userName', 255).unique().notNullable();
  //     //     table.string('password', 1024).notNullable();
  //     //     table.timestamps(true, true);
  //     //   })
  //     //   .then(() => {
  //     //     console.log('Done');
  //     //   });
  //   }

  public async createDefaultTables() {
    this.knex.schema
      .createSchemaIfNotExists('auth')
      .then(function () {})
      .finally(() => {
        this.knex.schema
          .withSchema('auth')
          .createTable('testers', function (table) {
            table.increments('id');
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('userName', 255).notNullable();
            table.string('password', 1024).notNullable();
            table.timestamps(true, true);
          })
          .then(function () {
            console.log('Table Created');
          });
      });

    // this.knex.schema
    //   .withSchema('auth')
    //   .createTable('testers', function (table) {
    //     table.increments('id');
    //     table.string('firstName', 255).notNullable();
    //     table.string('lastName', 255).notNullable();
    //     table.string('userName', 255).notNullable();
    //     table.string('password', 1024).notNullable();
    //     table.timestamps(true, true);
    //   })
    //   .then(function () {
    //     console.log('Done');
    //   });
  }

  /* 
    Creates or updates the default tables
    */

  // this.knex
  //   .withSchema('public')
  //   .select('testers')
  //   .then((result) => {});

  // return this.knex.schema.hasTable('testers').then((result) => {
  //   if (!result) {
  //     console.log('Not Found', result);
  //     this.create();
  //   } else {
  //     console.log('found');
  //   }
  // });

  // this.knex.schema.hasTable('public.testers').then(function (exists) {
  //   if (!exists) {
  //     console.log('Not Exists');
  //     this.create().then(() => {
  //       console.log('Done');
  //     });
  // this.knex.schema
  //   .createTable('public.testers', function (t) {
  //     t.increments('id');
  //     // t.string('firstName', 255).notNullable();
  //     // t.string('lastName', 255).notNullable();
  //     // t.string('userName', 255).unique().notNullable();
  //     // t.string('password', 1024).notNullable();
  //     // t.timestamps(true, true);
  //   })
  //   .then(() => {
  //     console.log('Created');
  //   });
  //   }
  // });
}

// this.knex.schema
//   .createTableIfNotExists('public.testers', function (table) {
//     table.increments('id');
//     table.string('firstName', 255).notNullable();
//     table.string('lastName', 255).notNullable();
//     table.string('userName', 255).unique().notNullable();
//     table.string('password', 1024).notNullable();
//     table.timestamps(true, true);
//   })
//   .then(() => {});

// // this.knex.schema
//   .createTable('testers', function (table) {
//     table.increments('id');
//     table.string('firstName', 255).notNullable();
//     table.string('lastName', 255).notNullable();
//     table.string('userName', 255).unique().notNullable();
//     table.string('password', 1024).notNullable();
//     table.timestamps(true, true);
//   })
//   .then(() => {
//     console.log('Done');
//   });

//   create() {
//     this.knex.schema
//       .createTable('public.testers', function (table) {
//         table.increments('id');
//         table.string('firstName', 255).notNullable();
//         table.string('lastName', 255).notNullable();
//         table.string('userName', 255).notNullable();
//         table.string('password', 1024).notNullable();
//         table.timestamps(true, true);
//       })
//       .then(function () {
//         console.log('Done');
//       });
//   }
// }
