import { ConfigService } from 'src/config/config.service';
import { DictionaryManager } from 'src/database/providers/postgres';

/* Interface that all DBProviders must adhere to */
export interface IDatabaseProvider {
  // Some common variables
  // - all concrete classes must have
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;

  // Public methods
  // - all concrete classes must have
  showConfig(): object;
  findMany(table_name: string): any;
}

export type TDatabaseFieldAndValue = {
  fieldName: string;
  fieldValue: any;
};

export type TDatabaseProviderConstructor = {
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;
  config_service: ConfigService;
  dictionary_manager: DictionaryManager;
};
