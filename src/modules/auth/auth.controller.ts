/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:23:54
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard, LocalGuard, PreviewGuard } from '@/common/guards';
import { ChangePasswordDto, RegisterUserDto } from './dto';
import { UserService } from '@/modules/user/user.service';
import * as svgCaptcha from 'svg-captcha';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: any, @Body() body) {
    // 预览环境下可快速登录，不用验证码
    if (this.configService.get('IS_PREVIEW') === 'true' && body.isQuick) {
      return this.authService.login(req.user, req.session?.code);
    }
    // 判断验证码是否正确
    if (req.session?.code?.toLocaleLowerCase() !== body.captcha?.toLocaleLowerCase()) {
      throw new CustomException(ErrorCode.ERR_10003);
    }
    return this.authService.login(req.user, req.session?.code);
  }

  @Post('register')
  @UseGuards(PreviewGuard)
  async register(@Body() user: RegisterUserDto) {
    return this.userService.create(user);
  }

  @Get('refresh/token')
  @UseGuards(JwtGuard)
  async refreshToken(@Req() req: any) {
    return this.authService.generateToken(req.user);
  }

  @Post('current-role/switch/:roleCode')
  @UseGuards(JwtGuard)
  async switchCurrentRole(@Req() req: any, @Param('roleCode') roleCode: string) {
    return this.authService.switchCurrentRole(req.user, roleCode);
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(@Req() req: any) {
    return this.authService.logout(req.user);
  }

  @Get('captcha')
  async createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 40,
      width: 80,
      height: 40,
      background: '#fff',
      color: true,
    });
    req.session.code = captcha.text || '';
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('password')
  @UseGuards(JwtGuard, PreviewGuard)
  async changePassword(@Req() req: any, @Body() body: ChangePasswordDto) {
    const ret = await this.authService.validateUser(req.user.username, body.oldPassword);
    if (!ret) {
      throw new CustomException(ErrorCode.ERR_10004);
    }
    // 修改密码
    await this.userService.resetPassword(req.user.id, body.newPassword);
    // 修改密码后退出登录
    await this.authService.logout(req.user);
    return true;
  }
}
