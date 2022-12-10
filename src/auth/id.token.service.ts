import { Injectable, Logger } from '@nestjs/common';
import * as argon from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { TokenActionTypeEnum } from './constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { UsersService } from 'src/users/users.service';

/*
This class is responsible for the generating and managing the platforms ID Tokens
*/

@Injectable()
export class IdTokenService {
  /*
   Inject knexjs into the service
   see: https://knexjs.org/guide/
  */
  constructor(private jwtService: JwtService, private logger: Logger, private configService: ConfigService, private usersService: UsersService) {}

  // Generate the signed JWT Token and Refresh Token
  async getTokens(userId: number, email: string, tenantId: any, action: TokenActionTypeEnum) {
    // Generate the payload
    const payload = {
      sub: userId,
      username: email,
      tenant: tenantId,
    };

    // Generate the JWT ID's
    const accessTokenId = uuidv4();
    const refreshTokenId = uuidv4();

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
        secret: this.configService.get('JWT_SECRET'),
        audience: this.configService.get('JWT_AUDIENCE'),
        issuer: this.configService.get('JWT_ISSUER'),
        jwtid: accessTokenId,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        audience: this.configService.get('JWT_AUDIENCE'),
        issuer: this.configService.get('JWT_ISSUER'),
        jwtid: refreshTokenId,
      }),
    ]);

    // Save the token_id, refreshToken against the user record
    if (action == TokenActionTypeEnum.login) {
      this.usersService.saveLoginTokens(userId, accessTokenId, refreshTokenId, await this.hashData(refreshToken));
    }

    if (action == TokenActionTypeEnum.refreshToken) {
      this.usersService.saveRefreshTokens(userId, accessTokenId, refreshTokenId, await this.hashData(refreshToken));
    }

    // Return the access token and refresh token
    return { accessToken, refreshToken };
  }

  hashData(data: string) {
    return argon.hash(data);
  }

  async refreshTokens(userId: number, userName: string) {
    /*
    Recreate some new access tokens and refresh tokens
    */
    // return this.getTokens(userId, userName, TokenActionTypeEnum.refreshToken);
  }
}
