import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/auth/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    /*
    Uses Reflector class to get the 'isPublic' metafata flag, if its been put there by the @Public auth guard
    */
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If the 'isPublic' metaadata flag is found - don't continue  authenticating
    // with a JWT - just return true and continue (no auth required)
    if (isPublic) {
      return true;
    }

    // No 'isPublic' metadata flag - continue to authentication
    return super.canActivate(context);
  }
}
