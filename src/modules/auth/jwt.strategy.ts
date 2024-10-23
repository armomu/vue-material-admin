/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:26:02
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { ACCESS_TOKEN_EXPIRATION_TIME, USER_ACCESS_TOKEN_KEY } from '@/constants/redis.contant';
import { RedisService } from '@/shared/redis.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    private redisService: RedisService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || configService.get('JWT_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const user = await this.userService.findByUsername(payload.username);
    if (!user.enable) {
      throw new CustomException(ErrorCode.ERR_11007);
    }
    const currentRole = user.roles.find((item) => item.code === payload.currentRoleCode);
    if (!currentRole.enable) {
      throw new CustomException(ErrorCode.ERR_11008);
    }

    // 从请求头中提取JWT
    const reqToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // 从Redis中获取用户访问令牌
    const accessToken = await this.redisService.get(this.authService.getAccessTokenKey(payload));

    // 如果请求令牌不等于访问令牌
    if (reqToken !== accessToken) {
      this.redisService.del(this.authService.getAccessTokenKey(payload));
      throw new HttpException(ErrorCode.ERR_11002, HttpStatus.UNAUTHORIZED);
    }

    // 延长token过期时间
    this.redisService.set(
      this.authService.getAccessTokenKey(payload),
      accessToken,
      ACCESS_TOKEN_EXPIRATION_TIME,
    );

    return {
      userId: payload.userId,
      username: payload.username,
      roleCodes: payload.roleCodes || [],
      currentRoleCode: payload.currentRoleCode,
      captcha: payload.captcha,
    };
  }
}
