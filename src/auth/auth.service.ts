import { Inject, Injectable } from '@nestjs/common';
import { userDTO } from './dto';
import { DB_CONNECTION } from 'src/database/constants';

export type User = any;

@Injectable()
export class AuthService {
  constructor(@Inject(DB_CONNECTION) private dbProvider: any) {}

  async register(dto: userDTO) {
    //   return this.dbProvider.doInsert(
    //     'root.user',
    //     ['email_address', 'password_hash'],
    //     [`'${dto.email}'`, `'${dto.password}'`],
    //   );
    //   return {
    //     User: dto.email,
    //     Password: dto.password,
    //   };
  }

  async login(userName: string, password: string): Promise<User | undefined> {
    const user = this.dbProvider.executeQueryText(
      `select * from public.user where username='${userName}' and password='${password}'`,
    );
    return user;
  }
}
