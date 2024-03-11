import { Injectable } from '@nestjs/common';
import { User } from 'src/models';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export class UserRepository {
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

  update(id: string, updatedUser: User): User | null {
    const userIndex: number = this.user.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      this.user[userIndex] = new User(updatedUser);

      return this.user[userIndex];
    }

    return null;
  }

  remove(id: string): void {
    const userIndex: number = this.user.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      this.user.splice(userIndex, 1);

      return;
    }
  }
}
