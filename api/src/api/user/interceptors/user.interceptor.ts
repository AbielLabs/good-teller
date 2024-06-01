import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserWithoutPassowrd } from '../dto/user.dto';

export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Array)
          data.map((user) => plainToInstance(UserWithoutPassowrd, user));
        return plainToInstance(UserWithoutPassowrd, data);
      }),
    );
  }
}
