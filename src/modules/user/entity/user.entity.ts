import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

export class UserEntity {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;

  constructor(user: Partial<User>) {
    this.id = user.id;

    this.login = user.login;

    this.password = user.password;

    this.version = user.version;

    this.createdAt = user.createdAt
      ? Number(user.createdAt)
      : new Date().getTime();

    this.updatedAt = user.updatedAt
      ? Number(user.updatedAt)
      : new Date().getTime();
  }
}
