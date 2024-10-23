/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:25:11
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { CanActivate, Injectable } from '@nestjs/common';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PreviewGuard implements CanActivate {
  constructor(protected configService: ConfigService) {}

  canActivate(): boolean {
    if (this.configService.get('IS_PREVIEW') === 'true')
      throw new CustomException(ErrorCode.ERR_30001);
    return true;
  }
}
