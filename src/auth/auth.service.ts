import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DB_CONNECTION } from 'src/database/constants';
import * as argon from 'argon2';
import { ConfigService } from 'src/config/config.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { ACCESS_DENIED } from './constants';
import { LogEntryExit } from 'src/common/custom.decorators';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_CONNECTION) private dbProvider: any,
    private usersService: UsersService,
    private configService: ConfigService,
    private jwt: JwtService,
    private readonly logger: Logger,
  ) {}

  // async register(dto: userDTO) {
  //   return this.dbProvider.doInsert(
  //     'root.user',
  //     ['email_address', 'password_hash'],
  //     [`'${dto.email}'`, `'${dto.password}'`],
  //   );
  //   return {
  //     User: dto.email,
  //     Password: dto.password,
  //   };
  // }

  @LogEntryExit
  async validateUser(email: string, password: string) {
    // Request the user details that match the username / email
    // - leveraging the usersService

    console.log('Email ', email);
    console.log('Pwd ', password);
    this.logger.error({
      message: 'This is a error',
      context: this.constructor.name,
    });

    const user = await this.usersService.findUserByEmail(email);

    // if no users were returned - return None
    if (user.length < 1) {
      return undefined;
    }

    // Verify the password hash matches
    const passwordMatch = await argon.verify(user[0].password, password);

    // if the password does not match - return None
    if (!passwordMatch) {
      return undefined;
    }

    const q = this.dbProvider
      .query('testtable')
      .addColumn('test')
      .addColumn('test2')
      .execute();

    // If we get here - return the user
    // return this.signedToken(user.id, user.email);
    return user;
  }

  //Logout by clearing the refresh token
  @LogEntryExit
  async logout(userId: number) {
    return this.usersService.clearRefreshToken(userId);
  }

  // Generate the signed JWT Token and Refresh Token
  // @LogEntryExit
  async getTokens(userId: number, email: string) {
    // Generate the payload
    const payload = {
      sub: userId,
      email: email,
    };

    // Generate the access token
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
        secret: this.configService.get('JWT_SECRET'),
        audience: this.configService.get('JWT_AUDIENCE'),
        issuer: this.configService.get('JWT_ISSUER'),
        jwtid: uuidv4(),
      }),
      // Generate the refresh token
      this.jwt.signAsync(payload, {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        audience: this.configService.get('JWT_REFRESH_AUDIENCE'),
        issuer: this.configService.get('JWT_REFRESH_ISSUER'),
        jwtid: uuidv4(),
      }),
    ]);

    // Save the refreshToken against the user record
    this.updateRefreshToken(userId, refreshToken);

    // Provide the new access tokens and refresh tokens
    return { accessToken, refreshToken };
  }

  @LogEntryExit
  hashData(data: string) {
    return argon.hash(data);
  }

  // Save the current refresh token against the user record
  @LogEntryExit
  async updateRefreshToken(userId: number, refreshToken: string) {
    // Hash the refresh token before saving in the database
    const hashedRefreshToken = await this.hashData(refreshToken);

    //Add the refreshtoken to the DB, against the user record
    this.usersService.saveRefreshToken(userId, hashedRefreshToken);
  }

  @LogEntryExit
  async refreshTokens(userId: number, refreshToken: string) {
    // Get the user record from the DB
    const user = await this.usersService.findUserByID(userId);

    // If no user or user has no refresh token - then deny the request to refresh the token
    if (!user[0] || !user[0].refreshtoken) {
      throw new ForbiddenException(ACCESS_DENIED);
    }

    // Compare the current refresh token to the one we have recorded against the user record
    console.log('User: ' + user[0].refreshtoken);
    console.log('Same? ' + refreshToken);

    const refreshTokenMatches = await argon.verify(
      user[0].refreshtoken,
      refreshToken,
    );

    console.log('Start');
    // Refresh token do not match - deny the request to refresh the access token
    if (!refreshTokenMatches) throw new ForbiddenException(ACCESS_DENIED);

    console.log('End');

    // Refresh tokens match - get new tokens
    const tokens = await this.getTokens(user[0].id, user[0].email);

    // Save the new refresh token against the user record
    await this.updateRefreshToken(user[0].id, tokens.refreshToken);

    // provide the new tokens back to the user
    return tokens;
  }
}
