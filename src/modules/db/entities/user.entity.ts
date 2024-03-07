import { Injectable } from '@nestjs/common';
import { User } from 'src/models';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export class UserEntity {
  private user: User[] = [];

  constructor() {}

  create(createUserDto: CreateUserDto): User {
    const user: User = new User(createUserDto);

    this.user.push(user);

    return user;
  }

  findAll(): User[] {
    return this.user;
  }

  findOne(id: string): User | null {
    return this.user.find((user) => user.id === id) || null;
  }
}
