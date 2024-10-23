/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:26:09
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authSerevice: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authSerevice.validateUser(username, password);
    if (!user) throw new CustomException(ErrorCode.ERR_10002);
    return user;
  }
}
