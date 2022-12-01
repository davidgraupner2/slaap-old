import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto';
import * as argon from 'argon2';
import * as authContants from 'src/auth/constants';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

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

  /*
  Check we have a valid email address and password combination
  - Used for authentication
  */
  async validUser(userName: string, password: string) {
    // Do we have a user with that email address
    const user = await this.knex
      .table<LoginUserDto>('users')
      .where('email', userName)
      .select('email')
      .select('firstName')
      .select('lastName')
      .select('password')
      .first();

    if (!user) {
      console.log('No');
      throw new ForbiddenException(authContants.CREDENTIALS_INCORRECT);
    }

    // Now compare the password hash
    console.log(user.password, password);
    const pwMatch = await argon.verify(user.password, password);

    // If Password not correct - throw exception
    if (!pwMatch) {
      throw new ForbiddenException(authContants.CREDENTIALS_INCORRECT);
    }

    return { user };
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
}
