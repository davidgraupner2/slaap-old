import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/postgres/database.service';
import { userDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async register(dto: userDTO) {
    return this.databaseService.doInsert(
      'root.user',
      ['email_address', 'password_hash'],
      [`'${dto.email}'`, `'${dto.password}'`],
    );

    return {
      User: dto.email,
      Password: dto.password,
    };
  }

  login() {
    return 'login';
  }
}
