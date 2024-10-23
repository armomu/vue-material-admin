/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:24:11
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { SetMetadata } from '@nestjs/common';
import { ReturnType as Type } from '@/types';

export const ReturnType = (returnType: Type) => SetMetadata('returnType', returnType);
