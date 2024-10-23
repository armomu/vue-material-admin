/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:27:04
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {
  AddRolePermissionsDto,
  AddRoleUsersDto,
  CreateRoleDto,
  GetRolesDto,
  QueryRoleDto,
  UpdateRoleDto,
} from './dto';
import { JwtGuard, PreviewGuard, RoleGuard } from '@/common/guards';
import { Roles } from '@/common/decorators/roles.decorator';

@Controller('role')
@UseGuards(JwtGuard, RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() query: GetRolesDto) {
    return this.roleService.findAll(query);
  }

  @Get('page')
  findPagination(@Query() queryDto: QueryRoleDto) {
    return this.roleService.findPagination(queryDto);
  }

  @Get('permissions')
  findRolePermissions(@Query('id') id: number) {
    return this.roleService.findRolePermissions(+id);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN', 'SYS_ADMIN', 'ROLE_PMS')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  remove(@Param('id') id: number) {
    return this.roleService.remove(+id);
  }

  @Post('permissions/add')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  addRolePermissions(@Body() dto: AddRolePermissionsDto) {
    return this.roleService.addRolePermissions(dto);
  }

  @Get('permissions/tree')
  findRolePermissionsTree(@Request() req: any) {
    return this.roleService.findRolePermissionsTree(req.user.currentRoleCode);
  }

  // 给角色分配用户
  @Patch('users/add/:roleId')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  addRoleUsers(@Param('roleId') roleId: string, @Body() dto: AddRoleUsersDto) {
    return this.roleService.addRoleUsers(+roleId, dto);
  }

  // 给角色取消分配用户
  @Patch('users/remove/:roleId')
  @UseGuards(PreviewGuard)
  @Roles('SUPER_ADMIN')
  removeRoleUsers(@Param('roleId') roleId: string, @Body() dto: AddRoleUsersDto) {
    return this.roleService.removeRoleUsers(+roleId, dto);
  }
}
