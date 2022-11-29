import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('configuration')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get('platform')
  platformConfiguration() {
    return this.configService.configuration();
  }
}
