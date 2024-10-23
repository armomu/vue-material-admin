/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:24:23
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { HttpException, HttpStatus } from '@nestjs/common';
import { ERR } from './error-code';
import { ErrInfo } from './error-code';

/**
 * 自定义异常类
 */
export class CustomException extends HttpException {
  protected code: number;
  constructor(err: ErrInfo, message?: string, status?: HttpStatus) {
    message = message ?? err.message ?? String(err.code);
    super(message, status ?? HttpStatus.BAD_REQUEST);
    this.code = err.code;
  }
}

export { ERR as ErrorCode };
