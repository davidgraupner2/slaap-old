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
}

/* Function Arguments Interfaces */
export interface constructorInterface {
  type: string;
  hostName: string;
  port: number;
  databaseName: string;
  userName: string;
  password: string;
}
