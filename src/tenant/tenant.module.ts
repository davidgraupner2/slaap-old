import { Module, Logger } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

@Module({
  providers: [TenantService, Logger],
  controllers: [TenantController],
})
export class TenantModule {}
