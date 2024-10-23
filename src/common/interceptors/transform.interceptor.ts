/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:25:23
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable, map } from 'rxjs';
import { ReturnType } from '@/types';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const returnType = this.reflector.get<ReturnType>('returnType', context.getHandler());
    const req = context.getArgByIndex(1).req as Request;
    return next.handle().pipe(
      map((data) => {
        switch (returnType) {
          case 'primitive':
            return data;
          default:
            return {
              code: 0,
              message: 'OK',
              data,
              originUrl: req.originalUrl,
            };
        }
      }),
    );
  }
}
