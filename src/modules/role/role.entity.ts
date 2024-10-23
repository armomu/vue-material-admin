/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:27:11
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/modules/user/user.entity';
import { Permission } from '@/modules/permission/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ unique: true, length: 50 })
  name: string;

  @Column({ default: true })
  enable: boolean;

  @ManyToMany(() => User, (user) => user.roles, {
    createForeignKeyConstraints: false,
  })
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    createForeignKeyConstraints: false,
  })
  @JoinTable()
  permissions: Permission[];
}
