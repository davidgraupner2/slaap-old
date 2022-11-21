import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CREDENTIALS_INCORRECT } from '../constants';

// The local passport stragegy leverages the AuthService to verify whether a user record
// exists that matches the username / password passed in.
// The Validate function is called from the strategy

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    // Validate the passed in user credentials using the Auth Service
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException(CREDENTIALS_INCORRECT);
    }

    // Make sure we don't add the password to the user object
    delete user[0].password;

    // Returns the user record, which passport will use to create a User objects and
    // attach to the Request object as 'req.user'
    return user[0];
  }
}
