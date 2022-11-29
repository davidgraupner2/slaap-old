import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';

@Module({
  controllers: [SchemaController],
  providers: [SchemaService, DatabaseService],
})
export class SchemaModule {}
