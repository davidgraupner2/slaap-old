import { Inject, Injectable } from '@nestjs/common';
import { localLoginDTO } from './dto';
import { UsersService } from 'src/users/users.service';
import { DB_CONNECTION } from 'src/database/constants';

export type User = any;

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB_CONNECTION) private dbProvider: any,
    private usersService: UsersService,
  ) {}

  // async register(dto: userDTO) {
  //   return this.dbProvider.doInsert(
  //     'root.user',
  //     ['email_address', 'password_hash'],
  //     [`'${dto.email}'`, `'${dto.password}'`],
  //   );
  //   return {
  //     User: dto.email,
  //     Password: dto.password,
  //   };
  // }

  async validateUser(dto: localLoginDTO): Promise<User | undefined> {
    const user = await this.usersService.findUserByEmail(dto.email);

    if (user) {
      return user;
    }

    return null;
  }
}
