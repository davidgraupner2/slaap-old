import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
// Create a class to implement a guard using local auth passport strategy
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
// Create a class to implement a guard using JWT auth passport strategy
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Check if the route has the public (No Auth required) flag set
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      // Public flag is set - no need for auth
      return true;
    }

    // Call super canActivate() to continue the process of authentication
    // - as route is not public and authentication needs to occur
    return super.canActivate(context);
  }
}

// We have setup a global app guard to use JWT Authentication across all routes
// - See: auth.module.ts
// We need a mechanism to make certain routes exempt i.e. Public
// In the below code we create a Decorator called 'Public' to do so
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
