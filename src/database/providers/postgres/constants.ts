/*
Some predefined SQL Statements used by the provider
*/
export const SCHEMA_TABLES =
  "select distinct table_name, table_catalog, table_schema from information_schema.columns where table_schema not in ('information_schema', 'pg_catalog')";

export const SCHEMA_COLUMNS =
  "select column_name, ordinal_position, data_type from information_schema.columns where table_name = '?' order by ordinal_position";
