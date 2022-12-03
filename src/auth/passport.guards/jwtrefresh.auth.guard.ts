import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//Create a class to implement a guard using the JWT Refresh Token Strategy
export class JWTRefreshAuthGuard extends AuthGuard('jwt-refresh') {}
