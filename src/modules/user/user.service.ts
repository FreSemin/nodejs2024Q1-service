import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenError, NotFoundError } from 'src/utils';
import { DbService } from '../db/db.service';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  create(createUserDto: CreateUserDto): UserEntity {
    return this.dbService.userRepository.create(createUserDto);
  }

  findAll(): UserEntity[] {
    return this.dbService.userRepository.findAll();
  }

  findOne(id: string): UserEntity {
    const user: UserEntity | null = this.dbService.userRepository.findOne(id);

    if (!user) {
      // TODO: add message to config or constants
      throw new NotFoundError('User not found!');
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const user: UserEntity = this.findOne(id);

    if (updateUserDto.oldPassword !== user.password) {
      // TODO: add password message to config or constants
      throw new ForbiddenError('Wrong password!');
    }

    return this.dbService.userRepository.update(id, {
      ...user,
      password: updateUserDto.newPassword,
    });
  }

  remove(id: string) {
    this.findOne(id);

    this.dbService.userRepository.remove(id);
  }
}
