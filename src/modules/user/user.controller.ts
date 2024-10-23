/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:28:41
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Delete,
  Patch,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  AddUserRolesDto,
  CreateUserDto,
  GetUserDto,
  UpdatePasswordDto,
  UpdateProfileDto,
  UpdateUserDto,
} from './dto';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { JwtGuard, PreviewGuard, RoleGuard } from '@/common/guards';
import { Roles } from '@/common/decorators/roles.decorator';

@Controller('user')
@UseGuards(JwtGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  addUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get()
  getAllUsers(@Query() queryDto: GetUserDto) {
    return this.userService.findAll(queryDto);
  }

  @Delete(':id')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  deleteUser(@Param('id') id: number, @Request() req: any) {
    const currentUser = req.user;

    if (currentUser.userId === id)
      throw new CustomException(ErrorCode.ERR_11006, '非法操作，不能删除自己！');
    return this.userService.remove(id);
  }

  @Patch(':id')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN', 'SYS_ADMIN')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  /**
   * @desc 修改用户资料
   */
  @Patch('/profile/:id')
  @UseGuards(PreviewGuard)
  updateProfile(
    @Body() profile: UpdateProfileDto,
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    const currentUser = req.user;
    // 只能本人修改
    if (currentUser.userId !== id)
      throw new CustomException(ErrorCode.ERR_11004, '越权操作，用户资料只能本人修改！');
    return this.userService.updateProfile(id, profile);
  }

  /**
   * @desc 获取当前登录用户的详情信息
   */
  @Get('detail')
  getUserInfo(@Request() req: any) {
    const currentUser = req.user;
    return this.userService.findUserDetail(currentUser.userId, currentUser.currentRoleCode);
  }

  @Get(':username')
  @Roles('SUPER_ADMIN')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  // 查询用户的profile
  @Get('profile/:userId')
  getUserProfile(@Param('userId') userId: number, @Request() req: any) {
    // 涉及隐私信息，只能本人或者超管查询
    const currentUser = req.user;
    // 只能本人或者超管查询
    if (currentUser.userId === userId || currentUser.roles.includes('SUPER_ADMIN')) {
      return this.userService.findUserProfile(userId);
    }
    throw new CustomException(ErrorCode.ERR_11003);
  }

  /** 给用户赋角色 */
  @Post('roles/add/:userId')
  @Roles('SUPER_ADMIN')
  @UseGuards(PreviewGuard)
  addRoles(@Param('userId') userId: number, @Body() dto: AddUserRolesDto) {
    return this.userService.addRoles(userId, dto.roleIds);
  }

  /** 管理员重置密码 */
  @Patch('password/reset/:userId')
  @Roles('SUPER_ADMIN')
  @UseGuards(PreviewGuard)
  resetPassword(@Param('userId') userId: number, @Body() dto: UpdatePasswordDto) {
    return this.userService.resetPassword(userId, dto.password);
  }
}
