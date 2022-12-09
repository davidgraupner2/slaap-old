import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/passport.guards/jwt.auth.guard';
import { ConfigService } from './config.service';

@Controller('configuration')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get('platform')
  platformConfiguration(@Request() req) {
    console.log(req.user);
    return this.configService.configuration();
  }
}
