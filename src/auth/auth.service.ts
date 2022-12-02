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
    First check we have a user with that enail address
    */
    // this.logger.log(
    //   'alert',
    //   `Received authentication request from ${ip} for userName: ${userName} and password: ${password}`,
    //   this.constructor.name,
    // );
    const user = await this.usersService.findOneByUserName(
      userName,
      this.configService.get('auth_username_field'),
    );

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
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
