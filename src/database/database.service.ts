import {
  ConsoleLogger,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { threadId } from 'worker_threads';

@Injectable()
export class DatabaseService {
  /*
   Inject knexjs into the service
   see: https://knexjs.org/guide/
  */
  constructor(
    @InjectModel() private readonly knex: Knex,
    private logger: Logger,
  ) {}

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

  private async createDefaultTables() {
    /* 
    Creates or updates the default tables
    */

    this.knex
      .withSchema('public')
      .select('testers')
      .then((result) => {});

    return this.knex.schema.hasTable('testers').then((result) => {
      if (!result) {
        console.log('Not Found', result);
        this.create();
      } else {
        console.log('found');
      }
    });

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

  create() {
    this.knex.schema
      .createTable('public.testers', function (table) {
        table.increments('id');
        table.string('firstName', 255).notNullable();
        table.string('lastName', 255).notNullable();
        table.string('userName', 255).notNullable();
        table.string('password', 1024).notNullable();
        table.timestamps(true, true);
      })
      .then(function () {
        console.log('Done');
      });
  }
}
