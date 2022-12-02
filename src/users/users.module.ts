import { Module, Logger } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, Logger],
})
export class UsersModule {}
