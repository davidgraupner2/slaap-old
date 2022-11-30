// Defines the interface used by the Config Options
export interface ConfigOptions {
  folder: string;
}

// Defines the interface used for the EnvConfig
export interface EnvConfig {
  [key: string]: string;
}

// Type to be returned when the platform configuration is requested
export type TConfiguration = {
  environment: string;
  configurationFolder: string;
  platformConfigurationFile: string;
};
