import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GlobalLoggingInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Set the context we will use for logging
    const requestLoggingContext = 'Request-Logging-Interceptor';
    const responseLoggingContext = 'Response-Logging-Interceptor';

    // Get the request object
    const request = context.switchToHttp().getRequest();

    // Get some values from the request we can use for logging
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;

    // Log the request
    this.logger.verbose(
      `UserId:${request.user.id} userTokenId:${
        request.user.token_id
      } IP:${ip} UserAgent: ${userAgent} --- ${method} ${url}  : [${
        context.getClass().name
      }()->${context.getHandler().name}() invoked]`,
      requestLoggingContext,
    );

    // TODO: Add a debug option to print the arguments passed in

    //Log the start time of the request
    const requestStart = Date.now();

    // Execute the route handler now
    return next.handle().pipe(
      tap((res) => {
        // Get access to the response
        const response = context.switchToHttp().getResponse();

        // Get the Status Code of the response
        const { statusCode } = response;
        const contentLength = response.get('content-length');

        // Log the response
        this.logger.verbose(
          `UserId:${request.user.id} userTokenId:${
            request.user.token_id
          } IP:${ip} UserAgent: ${userAgent} --- ${method} ${url}  : [statusCode: ${statusCode} contentLength: ${contentLength}  ${
            Date.now() - requestStart
          } ms]`,
          responseLoggingContext,
        );

        // TODO: Add a debug option to print the response passed back

        // Log the actual response that was returned
        // this.logger.debug(`Response: ${response}`);
      }),
    );
  }
}
