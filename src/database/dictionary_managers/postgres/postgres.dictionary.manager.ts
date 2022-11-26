import { IDictionaryManager, IDictionaryTable } from '../interfaces';
import { Pool } from 'pg';
import { IDBProviderInterface } from 'src/database/providers/interfaces';
import { ConfigService } from 'src/config/config.service';

export class PostgresDictionaryManager implements IDictionaryManager {
  constructor(private configService: ConfigService) {}

  // Define the custom properties we need to operate
  database_provider: IDBProviderInterface;

  // List of tables that are loaded and managed
  tables: IDictionaryTable[];

  // Table - where the table definitions are stored
  dictionary_table_name: string;

  // Table - where the table definitions are stored
  dictionary_fields_name: string;

  // Sets up the Dictionary Manager with the relevant database
  // provider and tables names
  initialise(
    database_provider: IDBProviderInterface,
    dictionary_table_name: string,
    dictionary_fields_name: string,
  ): void {
    // Save the database provider locally
    this.database_provider = database_provider;

    //Save the table name used for table definitions
    this.dictionary_table_name = dictionary_table_name;

    // Save the table name used for the field definitions
    this.dictionary_fields_name = dictionary_fields_name;
  }

  // Reloads all the tables in the dictionary and
  // - caches them
  loadTables(): Array<IDictionaryTable> {
    // Get the list of tables to load
    this.database_provider.findMany(this.dictionary_table_name).execute();

    return undefined;
  }

  loadTable(table_alias: string, reload = false): IDictionaryTable {
    console.log('Loading Table');
    console.log(this.dictionary_fields_name);
    // console.log(this.dictionary_table_name);
    // console.log(this.dictionary_field_name);

    // Get the table from cache if we have it
    // let table = this.cachedTable(table_alias);

    // // if we don't have the table OR we have been asked to reload it
    // // - then do so
    // if (table == undefined || (table != undefined && reload)) {
    //   this.database_provider.showConfig();
    // }

    // // if (this.cachedTable(table_alias) && !reload) {
    // //   // Table exists in cache and we haven't been asked to reload it
    // //   return table;
    // // }

    // return undefined;
    return undefined;

    // if
    // throw new Error('Method not implemented.');
    // if (this.cachedTable(table_alias)) {
    //   return this.tables.find((table) => {
    //     table.alias === table_alias.toUpperCase();
    //   });
    // } else {
    // }
  }

  cachedTable(table_alias: string): boolean {
    throw new Error('Method not implemented.');
    // Loop through the tables already loaded and see if its cached
    // this.tables.forEach((table) => {
    //   if (table.alias === table_alias.toUpperCase()) {
    //     // Table has already been cached
    //     return true;
    //   }
    // });

    // // Table was not found - not cached
    // return false;
  }
}
