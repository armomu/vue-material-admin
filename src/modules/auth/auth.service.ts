/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:25:48
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UserService } from '@/modules/user/user.service';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { RedisService } from '@/shared/redis.service';
import { ACCESS_TOKEN_EXPIRATION_TIME, USER_ACCESS_TOKEN_KEY } from '@/constants/redis.contant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, captcha?: string) {
    // 判断用户是否有enable属性为true的角色
    if (!user.roles?.some((item) => item.enable)) {
      throw new CustomException(ErrorCode.ERR_11003);
    }
    const roleCodes = user.roles?.map((item) => item.code);
    const currentRole = user.roles[0];
    const payload = {
      userId: user.id,
      username: user.username,
      roleCodes,
      currentRoleCode: currentRole.code,
    };
    if (this.configService.get('IS_PREVIEW') === 'true') payload['captcha'] = captcha;
    return this.generateToken(payload);
  }

  generateToken(payload: any) {
    const accessToken = this.jwtService.sign(payload);
    this.redisService.set(
      this.getAccessTokenKey(payload),
      accessToken,
      ACCESS_TOKEN_EXPIRATION_TIME,
    );
    return {
      accessToken,
    };
  }

  async switchCurrentRole(payload: any, roleCode: string) {
    const user = await this.userService.findByUsername(payload.username);
    if (!user.roles?.some((item) => item.enable)) {
      throw new CustomException(ErrorCode.ERR_11003);
    }
    const roleCodes = user.roles.map((item) => item.code);
    const currentRole = user.roles.find((item) => item.code === roleCode);
    if (!currentRole) {
      throw new CustomException(ErrorCode.ERR_11005, '您目前暂无此角色，请联系管理员申请权限');
    }
    payload = { ...payload, roleCodes, currentRoleCode: currentRole.code };
    return this.generateToken(payload);
  }

  async logout(user: any) {
    if (user.userId) {
      await Promise.all([this.redisService.del(this.getAccessTokenKey(user))]);
      return true;
    }
    return false;
  }

  getAccessTokenKey(payload: any) {
    return `${USER_ACCESS_TOKEN_KEY}:${payload.userId}${
      payload.captcha ? ':' + payload.captcha : ''
    }`;
  }
}
