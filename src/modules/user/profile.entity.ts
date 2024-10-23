/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:28:33
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 10 })
  nickName: string;

  @Column({ nullable: true })
  gender: number;

  @Column({
    default:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
  })
  avatar: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @OneToOne(() => User, (user) => user.profile, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ unique: true })
  userId: number;
}
