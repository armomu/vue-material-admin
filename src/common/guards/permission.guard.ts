/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:25:04
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    // 当前角色不在可操作角色范围内
    if (!user.currentRoleCode) throw new CustomException(ErrorCode.ERR_11005);

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles?.length) return true;
    const hasRole = roles.includes(user.currentRoleCode);
    if (!hasRole) throw new CustomException(ErrorCode.ERR_11003);
    return true;
  }
}
