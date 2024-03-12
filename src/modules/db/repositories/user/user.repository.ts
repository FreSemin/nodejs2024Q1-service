import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserEntity } from 'src/modules/user/entity/user.entity';

@Injectable()
export class UserRepository {
  private user: UserEntity[] = [];

  create(createUserDto: CreateUserDto): UserEntity {
    const user: UserEntity = new UserEntity(createUserDto);

    this.user.push(user);

    return user;
  }

  findAll(): UserEntity[] {
    return this.user;
  }

  findOne(id: string): UserEntity | null {
    return this.user.find((user) => user.id === id) || null;
  }

  update(id: string, updatedUser: UserEntity): UserEntity | null {
    const userIndex: number = this.user.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      this.user[userIndex] = new UserEntity(updatedUser);

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
