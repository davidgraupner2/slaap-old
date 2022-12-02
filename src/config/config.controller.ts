import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/passport.guards/jwt.auth.guard';
import { ConfigService } from './config.service';

@Controller('configuration')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @UseGuards(JwtAuthGuard)
  @Get('platform')
  platformConfiguration() {
    return this.configService.configuration();
  }
}
