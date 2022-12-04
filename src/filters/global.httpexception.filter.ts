import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  /* 
    Catch all HTTP Exceptions
    */
  catch(exception: HttpException, host: ArgumentsHost) {
    // Get the exception context
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception['response']['message'];

    // Update the status to be returned
    response.status(status).json({
      statusCode: status,
      statusMessage: message,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
