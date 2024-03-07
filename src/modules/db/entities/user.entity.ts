import { Injectable } from '@nestjs/common';

@Injectable()
export class UserEntity {
  private user: [] = [];

  constructor() {}

  findAll() {
    return this.user;
  }
}
