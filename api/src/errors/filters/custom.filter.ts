import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { configs } from 'src/configs';

export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const status: number =
      exception instanceof HttpException ? exception.getStatus() : 500;

    if (configs.NODE_ENV === 'production') res.sendStatus(status);
    res.status(status).json({
      status,
      message: exception.message,
    });
  }
}
