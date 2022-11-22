import { Injectable, Inject } from '@nestjs/common';
import { DB_CONNECTION } from 'src/database/constants';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@Inject(DB_CONNECTION) private dbProvider: any) {}

  // Get a user by their email address
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.dbProvider.executeQueryText(
      `select * from public.user where username='${email}'`,
    );
  }

  // Save a users refresh token
  async saveRefreshToken(userId: number, hashedRefreshToken: string) {
    return this.dbProvider.executeQueryText(
      `update public.user set refreshtoken = '${hashedRefreshToken}' where id = ${userId}`,
    );
  }

  // clear a users refresh token
  async clearRefreshToken(userId: number) {
    return this.dbProvider.executeQueryText(
      `update public.user set refreshtoken = '' where id = ${userId}`,
    );
  }
}
