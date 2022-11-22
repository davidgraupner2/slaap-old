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

  // Generate a signed JWT Token
  async signedToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    // Generate the payload
    const payload = {
      sub: userId,
      email: email,
    };

    // Generate the token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      secret: this.configService.get('JWT_SECRET'),
      audience: this.configService.get('JWT_AUDIENCE'),
      issuer: this.configService.get('JWT_ISSUER'),
      jwtid: uuidv4(),
    });

    return {
      access_token: token,
    };
  }
}
