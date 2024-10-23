/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:26:42
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { In, Repository } from 'typeorm';
import { SharedService } from '@/shared/shared.service';
import { pathToRegexp } from 'path-to-regexp';

@Injectable()
export class PermissionService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}
  create(createPermissionDto: CreatePermissionDto) {
    const createPermission = this.permissionRepo.create(createPermissionDto);
    return this.permissionRepo.save(createPermission);
  }

  batchCreate(createPermissionDtos: CreatePermissionDto[]) {
    const permissions = this.permissionRepo.create(createPermissionDtos);
    return this.permissionRepo.save(permissions);
  }

  findAll() {
    return this.permissionRepo.find({ where: { type: 'MENU' } });
  }

  async findAllTree() {
    const permissions = await this.permissionRepo.find({ order: { order: 'ASC' } });
    return this.sharedService.handleTree(permissions);
  }

  async findMenuTree() {
    const permissions = await this.permissionRepo.find({
      where: { type: 'MENU' },
      order: { order: 'ASC' },
    });
    return this.sharedService.handleTree(permissions);
  }

  findOne(id: number) {
    return this.permissionRepo.findOne({ where: { id } });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionRepo.findOne({ where: { id } });
    if (!permission) throw new BadRequestException('权限不存在或者已删除');
    const newPermission = this.permissionRepo.merge(permission, updatePermissionDto);
    await this.permissionRepo.save(newPermission);
    return true;
  }

  // TODO 递归删除所有子孙权限
  async remove(id: number) {
    const permission = await this.permissionRepo.findOne({
      where: { id },
      relations: { roles: true },
    });
    if (!permission) throw new BadRequestException('权限不存在或者已删除');
    if (permission.roles?.length)
      throw new BadRequestException('当前权限存在已授权的角色，不允许删除！');
    await this.permissionRepo.remove(permission);
    return true;
  }

  findButton(parentId: number) {
    return this.permissionRepo.find({
      where: { parentId, type: In(['BUTTON']) },
    });
  }

  async validateMenuPath(path: string) {
    const allMenu = await this.permissionRepo.find({
      where: { type: 'MENU' },
    });
    return allMenu.some((menu) => menu.path && pathToRegexp(menu.path).test(path))
  }
}
