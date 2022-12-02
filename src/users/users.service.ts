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

  async findOneByUserName(userName: string, userNameField: string) {
    // If the details provided are not sufficient, don't bother looking further
    if (!userName || !userNameField) {
      return undefined;
    }

    // check we have a user with the userName in the provided userName Field
    return await this.knex
      .table<LoginUserDto>('users')
      .where(userNameField, userName)
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
}
