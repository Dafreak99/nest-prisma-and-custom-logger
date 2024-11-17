import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MyLoggerService } from './my-logger/my-logger.service';
import { Response } from 'express';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { MyResponseObject } from './types';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObject: MyResponseObject = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResponseObject.statusCode = exception.getStatus();
      myResponseObject.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObject.statusCode = 422;
      myResponseObject.response = exception.message.replaceAll(/\n/g, '');
    } else {
      myResponseObject.statusCode = 500;
      myResponseObject.response = 'Internal server error';
    }

    response.status(myResponseObject.statusCode).json(myResponseObject);

    this.logger.error(myResponseObject.response);

    super.catch(exception, host);
  }
}
