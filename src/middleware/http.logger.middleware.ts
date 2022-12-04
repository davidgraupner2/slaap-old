import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class HTTPLogger implements NestMiddleware {
  constructor(private logger: Logger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      console.log('finish');
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.verbose(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        this.constructor.name,
      );
    });

    next();
  }
}
