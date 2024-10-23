/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:24:58
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { AuthGuard } from '@nestjs/passport';

export class LocalGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
}
