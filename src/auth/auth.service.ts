import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { UsersService } from 'src/users/users.service';
import * as argon from 'argon2';
import { ConfigService } from 'src/config/config.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { TokenActionTypeEnum } from './constants';

@Injectable()
export class AuthService {
  /*
   Inject knexjs into the service
   see: https://knexjs.org/guide/
  */
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private logger: Logger,
    private jwtService: JwtService,
  ) {}

  /*
  Check we have a valid email address and password combination
  - Used for authentication
  */
  async validateUserLocally(userName: string, password: string) {
    /*
    Validates whether a user / password combination exists in the local database
    */
    const user = await this.usersService.findOneByUserName(userName);

    // If we have a user - then compare the password hash in the Db , with the password provided
    if (user && (await argon.verify(user.password, password))) {
      // We have a user and matching password - return the user (without the password)
      delete user.password;
      return user;
    }

    // If we get here - we got no user OR password did not match
    return undefined;
  }

  /* 
    Called when a user has been validated and tokens need to be issued
  */
  async login(user: any) {
    // Create the users payload to return in the token
    // const payload = { username: user.userName, sub: user.id };

    // return {
    //   accessToken: this.jwtService.sign(payload),
    // };
    return this.getTokens(user.id, user.userName, TokenActionTypeEnum.login);
  }

  async logout(id: number) {
    /* 
    Logs out a user by revoking any tokens they might have
    */

    await this.usersService.revokeTokens(id, 'Logout');
  }

  // Generate the signed JWT Token and Refresh Token
  async getTokens(userId: number, email: string, action: TokenActionTypeEnum) {
    // Generate the payload
    const payload = {
      sub: userId,
      email: email,
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
      this.usersService.saveLoginTokens(
        userId,
        accessTokenId,
        refreshTokenId,
        await this.hashData(refreshToken),
      );
    }

    if (action == TokenActionTypeEnum.refreshToken) {
      this.usersService.saveRefreshTokens(
        userId,
        accessTokenId,
        refreshTokenId,
        await this.hashData(refreshToken),
      );
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
    return this.getTokens(userId, userName, TokenActionTypeEnum.refreshToken);
  }
}
