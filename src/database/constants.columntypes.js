/* 
Constants that define the columntypes that are available for the data dictionary
- Defined as a javascript NodeJS module so that it can be used in migrations
*/

const COLUMNTYPES = Object.freeze({
  increments: 'increments',
  integer: 'integer',
  bigInteger: 'bigInteger',
  tinyInt: 'tinyint',
  text: 'text',
  string: 'string',
  float: 'float',
  double: 'double',
  decimal: 'decimal',
  boolean: 'boolean',
  date: 'date',
  datetime: 'datetime',
  time: 'time',
  timestamp: 'timestamp',
  binary: 'binary',
  json: 'json',
  jsonb: 'jsonb',
  uuid: 'uuid',
});

module.exports = {
  COLUMNTYPES: COLUMNTYPES,
};
