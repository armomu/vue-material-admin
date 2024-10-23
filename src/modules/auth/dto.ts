/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:25:55
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

export class RegisterUserDto {
  @IsString()
  @Length(6, 20, {
    message: `用户名长度必须是$constraint1到$constraint2之间，当前传递的值是$value`,
  })
  username: string;

  @IsString()
  @Length(6, 20, { message: `密码长度必须是$constraint1到$constraint2之间` })
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: '旧密码不能为空' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: '新密码不能为空' })
  newPassword: string;
}
