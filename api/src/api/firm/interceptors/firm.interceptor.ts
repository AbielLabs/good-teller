import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { FirmWithoutPassowrd } from '../dto/create-firm.dto';
import { plainToInstance } from 'class-transformer';

export class FirmInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Array)
          data.map((firm) => plainToInstance(FirmWithoutPassowrd, firm));
        return plainToInstance(FirmWithoutPassowrd, data);
      }),
    );
  }
}
