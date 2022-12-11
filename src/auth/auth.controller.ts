import { Controller, Post, Request, UseGuards, Get, Version, Param, UnauthorizedException } from '@nestjs/common';
import * as dto from 'src/users/dto';
import { AuthService } from './auth.service';
import { JWTRefreshAuthGuard, LocalAuthGuard, Public } from 'src/auth/passport.guards';
import { User } from 'src/decorators/decorator.user';
import { IdTokenService } from './id.token.service';
import { TokenActionTypeEnum } from './constants';
import { DatabaseService, whereClause } from 'src/database/database.service';
import { TenantService } from 'src/tenant/tenant.service';
import * as authConstants from 'src/auth/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private idTokenService: IdTokenService, private databaseService: DatabaseService, private tenantService: TenantService) {}

  /* 
  Public route used to authenticate a user locally to the public domain
  - Database Name / Password
  and return a JWT Token
  */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login/:id')
  async loginUserLocally(@Request() req, @Param() params) {
    // if user validation with passport.js succeeds - the user object
    // is added to the request object and we return that, else the code in this route handler
    // will never run - passport.js will return an unauthorized exception

    /***********************************************************************
     We got here - so passport.js has validated the username and password 
     - and we have a user attached to the request object 
     **********************************************************************/

    // Get the tenant that this user logged into - if its a valid tenant
    const tenant = await this.tenantService.getValidTenantForUser(params.id, req.user.id, req.user.is_msp);

    if (tenant) {
      /*
       If we get here, we have a valid user object and valid tenant access
      */

      // Add the tenant to the request object
      req.user.tenant = tenant;

      // Return the ID Token to the user
      return this.idTokenService.getTokens(req.user.id, req.user.username, params.id, TokenActionTypeEnum.login);
    } else {
      /* 
      We have a valid user object, but the tenant requested is not valid - see logs 
      */
      throw new UnauthorizedException(authConstants.CREDENTIALS_INCORRECT);
    }
  }

  @Public()
  @UseGuards(JWTRefreshAuthGuard)
  @Get('refreshToken')
  refresh_token(@Request() req) {
    return this.idTokenService.refreshTokens(req.user.id, req.user.email);
  }

  @Get('logout')
  logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }
}
