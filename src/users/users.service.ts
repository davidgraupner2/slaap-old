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
}
