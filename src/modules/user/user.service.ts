import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/models';
import { ForbiddenError, NotFoundError } from 'src/utils';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  create(createUserDto: CreateUserDto): User {
    return this.dbService.userRepository.create(createUserDto);
  }

  findAll(): User[] {
    return this.dbService.userRepository.findAll();
  }

  findOne(id: string): User {
    const user: User | null = this.dbService.userRepository.findOne(id);

    if (!user) {
      // TODO: add message to config or constants
      throw new NotFoundError('User not found!');
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user: User = this.findOne(id);

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
