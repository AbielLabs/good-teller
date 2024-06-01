import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetCurrentAccountId = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return request.user['id'];
  },
);

export const GetFirmId = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    if (request.user['accountType'] === 'user') return request.user['firm_id'];

    return request.user['id'];
  },
);

export const GetCurrentAccountType = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return request.user['accountType'];
  },
);
