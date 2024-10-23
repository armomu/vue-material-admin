/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:26:30
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@/modules/role/role.entity';
import { MethodType, PermissionType } from '@/types';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column()
  type: PermissionType;

  @ManyToOne(() => Permission, (permission) => permission.children, {
    createForeignKeyConstraints: false,
  })
  parent: Permission;

  @OneToMany(() => Permission, (permission) => permission.parent, {
    createForeignKeyConstraints: false,
  })
  children: Permission[];

  @Column({ nullable: true })
  parentId: number;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  redirect: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  component: string;

  @Column({ nullable: true })
  layout: string;

  @Column({ nullable: true })
  keepAlive: boolean;

  @Column({ nullable: true })
  method: MethodType;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true, comment: '是否展示在页面菜单' })
  show: boolean;

  @Column({ default: true })
  enable: boolean;

  @Column({ nullable: true })
  order: number;

  @ManyToMany(() => Role, (role) => role.permissions, {
    createForeignKeyConstraints: false,
  })
  roles: Role[];
}
