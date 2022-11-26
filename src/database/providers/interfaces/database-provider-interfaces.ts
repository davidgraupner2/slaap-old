import { ConfigService } from 'src/config/config.service';
import { PostgresDictionaryManager } from 'src/database/dictionary_managers';

/* Interface that all DBProviders must adhere to */
export interface IDBProviderInterface {
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

export type TDBFieldAndValue = {
  fieldName: string;
  fieldValue: any;
};

export type TDBProviderConstructor = {
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;
  config_service: ConfigService;
  dictionary_manager: PostgresDictionaryManager;
};
