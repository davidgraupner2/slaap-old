import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { localLoginDTO } from './dto';
import { UsersService } from 'src/users/users.service';
import { DB_CONNECTION } from 'src/database/constants';
import * as argon from 'argon2';
import { ConfigService } from 'src/config/config.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_CONNECTION) private dbProvider: any,
    private usersService: UsersService,
    private configService: ConfigService,
    private jwt: JwtService,
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

  async validateUser(email: string, password: string) {
    // Request the user details that match the username / email
    // - leveraging the usersService

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

    // If we get here - return the user
    // return this.signedToken(user.id, user.email);
    return user;
  }

  //Logout by clearing the refresh token
  async logout(userId: number) {
    return this.usersService.clearRefreshToken(userId);
  }

  // Generate the signed JWT Token and Refresh Token
  async getTokens(userId: number, email: string) {
    // Generate the payload
    const payload = {
      sub: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
        secret: this.configService.get('JWT_SECRET'),
        audience: this.configService.get('JWT_AUDIENCE'),
        issuer: this.configService.get('JWT_ISSUER'),
        jwtid: uuidv4(),
      }),
      this.jwt.signAsync(payload, {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        audience: this.configService.get('JWT_AUDIENCE'),
        issuer: this.configService.get('JWT_ISSUER'),
        jwtid: uuidv4(),
      }),
    ]);

    // Save the refreshToken against the user record
    this.updateRefreshToken(userId, refreshToken);

    // Generate the token
    // const token = await this.jwt.signAsync(payload, {
    //   expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    //   secret: this.configService.get('JWT_SECRET'),
    //   audience: this.configService.get('JWT_AUDIENCE'),
    //   issuer: this.configService.get('JWT_ISSUER'),
    //   jwtid: uuidv4(),
    // });

    return { accessToken, refreshToken };
  }

  hashData(data: string) {
    return argon.hash(data);
  }

  // Save the current refresh token against the user record
  async updateRefreshToken(userId: number, refreshToken: string) {
    // Hash the refresh token before saving in the database
    const hashedRefreshToken = await this.hashData(refreshToken);

    //Add the refreshtoken to the DB, against the user record
    this.usersService.saveRefreshToken(userId, hashedRefreshToken);
  }
}
