import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../interface/user.interface';

export class UserEntity implements User {
  id: string = uuidv4();

  login: string;

  @Exclude()
  password: string;

  version: number = 0;

  createdAt: number = Date.now();

  updatedAt: number;

  constructor(user: Partial<User>) {
    Object.assign(this, user);

    this.version += 1;

    this.updatedAt = Date.now();
  }
}
