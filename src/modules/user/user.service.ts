import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../db/entities/user.entity';
import { User } from 'src/models';

@Injectable()
export class UserService {
  constructor(private readonly userEntity: UserEntity) {}

  create(createUserDto: CreateUserDto): User {
    return this.userEntity.create(createUserDto);
  }

  findAll(): User[] {
    return this.userEntity.findAll();
  }

  findOne(id: string): User | null {
    const user: User | null = this.userEntity.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user: User = this.findOne(id);

    if (updateUserDto.oldPassword !== user.password) {
      // TODO: add password message to config or constants
      throw new ForbiddenException('Wrong password!');
    }

    return this.userEntity.update(id, {
      ...user,
      password: updateUserDto.newPassword,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
