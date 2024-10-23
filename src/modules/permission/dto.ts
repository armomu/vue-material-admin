/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:26:16
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { MethodType, PermissionType } from '@/types';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  type: PermissionType;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  redirect?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  component?: string;

  @IsString()
  @IsOptional()
  layout?: string;

  @IsBoolean()
  @IsOptional()
  keepAlive?: boolean;

  @IsString()
  @IsOptional()
  method?: MethodType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  show?: boolean;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @Exclude()
  type: PermissionType;
}
