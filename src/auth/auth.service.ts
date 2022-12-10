import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, Logger, Request } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { UsersService } from 'src/users/users.service';
import * as argon from 'argon2';
import { ConfigService } from 'src/config/config.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { TokenActionTypeEnum } from './constants';
import { DatabaseService } from 'src/database/database.service';
import { userDTO } from 'src/users/dto';

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
    private databaseService: DatabaseService,
  ) {}

  /*
  Check we have a valid email address and password combination
  - Used for authentication
  */
  async validateUserLocally(userName: string, password: string) {
    /*
    Validates whether a user / password combination exists in the local database
    */
    // await this.databaseService.createAuthTables();

    // get the user by username that is being searched for
    const user = await this.usersService.findOneByUserName(userName);

    if (user && (await argon.verify(user.password, password))) {
      // We have a user and matching password - return the user (without the password)
      delete user.password;
      return user;
    }

    // If we get here - we got no user OR password did not match
    return undefined;
  }

  async logout(id: number) {
    /* 
    Logs out a user by revoking any tokens they might have
    */

    await this.usersService.revokeTokens(id, 'Logout');
  }
}
