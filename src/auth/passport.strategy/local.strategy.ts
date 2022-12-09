import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import * as authConstants from 'src/auth/constants';

@Injectable()
/* 
 We are leveraging the passpot.js strategies for authentocation
 - see: http://www.passportjs.org/concepts/authentication/strategies/
*/
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // Passport js call this function to authenticate a user
  async validate(username: string, password: string): Promise<any> {
    /*
    If a user is returned from the AuthService - then the user was validated using the username and password
    */
    const user = await this.authService.validateUserLocally(username, password);
    if (!user) {
      throw new UnauthorizedException(authConstants.CREDENTIALS_INCORRECT);
    }

    console.log(user);

    // If the user was found - passport.js adds the user to the request object as req.user
    delete user.password;
    return user;
  }
}
