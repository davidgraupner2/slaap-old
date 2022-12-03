import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  /*
   Inject knexjs into the service
   see: https://knexjs.org/guide/
  */
  constructor(
    @InjectModel() private readonly knex: Knex,
    private logger: Logger,
  ) {}

  async findAll() {
    const users = await this.knex.table('users').orderBy('id');
    return { users };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const users = await this.knex.table('users').insert({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByUserName(userName: string) {
    // If the details provided are not sufficient, don't bother looking further
    if (!userName) {
      return undefined;
    }

    // check we have a user with the userName in the provided userName Field
    return await this.knex
      .table<LoginUserDto>('users')
      .where('userName', userName)
      .first();
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table('users').where('id', id);
    return { users };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users = await this.knex.table('users').where('id', id).update({
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table('users').where('id', id).del();
    return { users };
  }

  async revokeTokens(id: number, revoke_reason: string) {
    /* 
    Revokes all current unrevoked tokens for a user id passed in
    - Used when generating new tokens OR logging out
    */
    await this.knex('tokens').where({ user_id: id, revoked: false }).update({
      revoked: true,
      revoked_at: new Date(),
      updated_at: new Date(),
      revoke_reason: revoke_reason,
      refresh_token: '',
    });
  }

  /*  
  Saves the current access token ID and hashed Refresh token against the user record
  */
  async saveTokens(id: number, tokenId: string, hashedRefreshToken: string) {
    /* First revoke all current tokens before adding the new ones
     - We don't want tokens lying around that can still be used by this user
     */
    await this.revokeTokens(id, 'Login - New Token Requested');

    // Save the new token against the user record
    // - Store the regreh token s- we can use that to grant the user a new token if needed
    const tokens = await this.knex.table('tokens').insert({
      user_id: id,
      access_token_id: tokenId,
      refresh_token: hashedRefreshToken,
    });
  }

  async getUserToken(id: number) {
    /* 
    Return the current token that is allocated to the user record
    - Will not return revoked tokens
    */
    return await this.knex
      .table('tokens')
      .where({
        id: id,
        revoked: false,
      })
      .first();
  }
}
