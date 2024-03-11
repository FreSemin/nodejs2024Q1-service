import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class User implements IUser {
  id: string = uuidv4();

  login: string;

  @Exclude()
  password: string;

  version: number = 0;

  createdAt: number = Date.now();

  updatedAt: number;

  constructor(user: Partial<IUser>) {
    Object.assign(this, user);

    this.version += 1;

    this.updatedAt = Date.now();
  }
}
