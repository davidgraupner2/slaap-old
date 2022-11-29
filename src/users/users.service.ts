import { Injectable, Inject } from '@nestjs/common';
import { DB_CONNECTION } from 'src/database/constants';

export type User = any;

@Injectable()
export class UsersService {
  // Store the tableName - where this object is stored
  tableName = 'public.user';

  constructor(@Inject(DB_CONNECTION) private dbProvider: any) {}

  // Get a user by their email address
  async findUserByEmail(email: string): Promise<User | undefined> {
    const findUser = this.dbProvider
      .findFirst(this.tableName)
      .where({ fieldName: 'username', fieldValue: email });
    findUser.execute();

    return this.dbProvider.executeQueryText(
      `select * from public.user where username='${email}'`,
    );
  }

  // Get a user by their id
  async findUserByID(id: number): Promise<User | undefined> {
    return this.dbProvider.executeQueryText(
      `select * from public.user where id='${id}'`,
    );
  }

  // Save a users refresh token
  async saveRefreshToken(id: number, hashedRefreshToken: string) {
    return this.dbProvider.executeQueryText(
      `update public.user set refreshtoken = '${hashedRefreshToken}' where id = ${id}`,
    );
  }

  // clear a users refresh token
  async clearRefreshToken(id: number) {
    return this.dbProvider.executeQueryText(
      `update public.user set refreshtoken = '' where id = ${id}`,
    );
  }
}
