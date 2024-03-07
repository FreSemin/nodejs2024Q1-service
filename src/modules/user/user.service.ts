import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../db/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userEntity: UserEntity) {}

  create(createUserDto: CreateUserDto) {
    return this.userEntity.create(createUserDto);
  }

  findAll() {
    return this.userEntity.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
