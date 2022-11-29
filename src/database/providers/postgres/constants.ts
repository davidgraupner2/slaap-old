/*
Some predefined SQL Statements used by the provider
*/
export const SCHEMA_TABLE_NAMES =
  "select distinct table_name, table_catalog, table_schema from information_schema.columns where table_schema not in ('information_schema', 'pg_catalog')";
