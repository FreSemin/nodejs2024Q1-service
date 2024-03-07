import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../db/entities/user.entity';
import { User } from 'src/models';

@Injectable()
export class UserService {
  constructor(private readonly userEntity: UserEntity) {}

  create(createUserDto: CreateUserDto) {
    return this.userEntity.create(createUserDto);
  }

  findAll() {
    return this.userEntity.findAll();
  }

  findOne(id: string): User | null {
    const user: User | null = this.userEntity.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
