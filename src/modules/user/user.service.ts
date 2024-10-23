/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:29:09
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { hashSync } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { CreateUserDto, GetUserDto, UpdateProfileDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { Profile } from './profile.entity';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { Role } from '@/modules/role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Profile)
    private profileRep: Repository<Profile>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  async create(user: CreateUserDto) {
    const { username } = user;
    const existUser = await this.findByUsername(username);

    if (existUser) {
      throw new CustomException(ErrorCode.ERR_10001);
    }

    const newUser = this.userRep.create(user);
    if (user.roleIds !== undefined) {
      newUser.roles = await this.roleRepo.find({
        where: { id: In(user.roleIds) },
      });
    }
    if (!newUser.profile) {
      newUser.profile = this.profileRep.create();
    }
    newUser.password = hashSync(newUser.password);
    await this.userRep.save(newUser);
    return true;
  }

  async findAll(query: GetUserDto) {
    const pageSize = query.pageSize || 10;
    const pageNo = query.pageNo || 1;
    const [users, total] = await this.userRep.findAndCount({
      select: {
        profile: {
          gender: true,
          avatar: true,
          email: true,
          address: true,
        },
        roles: true,
      },
      relations: {
        profile: true,
        roles: true,
      },
      where: {
        username: Like(`%${query.username || ''}%`),
        enable: query.enable || undefined,
        profile: {
          gender: query.gender || undefined,
        },
      },
      order: {
        createTime: 'ASC',
      },
      take: pageSize,
      skip: (pageNo - 1) * pageSize,
    });
    const pageData = users.map((item) => {
      const newItem = {
        ...item,
        ...item.profile,
      };
      delete newItem.profile;
      return newItem;
    });

    return { pageData, total };
  }

  async remove(id: number) {
    // 不能删除根用户
    if (id === 1) throw new CustomException(ErrorCode.ERR_11006, '不能删除根用户');
    await this.userRep.delete(id);
    await this.profileRep
      .createQueryBuilder('profile')
      .delete()
      .where('profile.userId = :id', { id })
      .execute();
    return true;
  }

  async update(id: number, user: UpdateUserDto) {
    const findUser = await this.findUserProfile(id);
    if (user.roleIds !== undefined) {
      findUser.roles = await this.roleRepo.find({
        where: { id: In(user.roleIds) },
      });
    }
    const newUser = this.userRep.merge(findUser, user);
    await this.userRep.save(newUser);
    return true;
  }

  async resetPassword(id: number, password: string) {
    const user = await this.userRep.findOne({ where: { id } });
    user.password = hashSync(password);
    await this.userRep.save(user);
    return true;
  }

  async updateProfile(id: number, profile: UpdateProfileDto) {
    const user = await this.findUserProfile(id);
    user.profile = this.profileRep.merge(user.profile, profile);
    await this.userRep.save(user);
    return true;
  }

  async findByUsername(username: string) {
    return this.userRep.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'enable'],
      relations: {
        profile: true,
        roles: true,
      },
    });
  }

  findUserProfile(id: number) {
    return this.userRep.findOne({
      where: { id },
      relations: {
        profile: true,
        roles: true,
      },
    });
  }

  async findUserDetail(id: number, roleCode: string) {
    const user = await this.userRep.findOne({
      where: { id },
      relations: {
        profile: true,
        roles: true,
      },
    });
    const currentRole = user.roles?.find((item) => item.code === roleCode && item.enable);
    if (!currentRole) {
      throw new CustomException(ErrorCode.ERR_11005, '您目前暂无此角色或已被禁用，请联系管理员');
    }
    return { ...user, currentRole };
  }

  async addRoles(userId: number, roleIds: number[]) {
    const user = await this.userRep.findOne({
      where: { id: userId },
      relations: { roles: true },
    });
    const roles = await this.roleRepo.find({
      where: roleIds.map((item) => ({ id: item })),
    });
    user.roles = user.roles.filter((item) => !roleIds.includes(item.id)).concat(roles);
    await this.userRep.save(user);
    return true;
  }
}
