import { Inject, Injectable } from '@nestjs/common';
import { userDTO } from './dto';
import { DB_CONNECTION } from 'src/database/constants';

@Injectable()
export class AuthService {
  constructor(@Inject(DB_CONNECTION) dbProvider: any) {}

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

  login() {
    return 'login';
  }
}
