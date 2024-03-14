import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenError, NotFoundError } from 'src/utils';
import { DbService } from '../db/db.service';
import { UserEntity } from './entity/user.entity';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(
      await this.dbService.userRepository.create(createUserDto),
    );
  }

  async findAll(): Promise<UserEntity[]> {
    return (await this.dbService.userRepository.findAll()).map(
      (user: User) => new UserEntity(user),
    );
  }

  async findOne(id: string): Promise<UserEntity> {
    const user: User | null = await this.dbService.userRepository.findOne(id);

    if (!user) {
      // TODO: add message to config or constants
      throw new NotFoundError('User not found!');
    }

    return new UserEntity(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.findOne(id);

    if (updateUserDto.oldPassword !== user.password) {
      // TODO: add password message to config or constants
      throw new ForbiddenError('Wrong password!');
    }

    return new UserEntity(
      await this.dbService.userRepository.update(id, {
        ...user,
        password: updateUserDto.newPassword,
      }),
    );
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.dbService.userRepository.remove(id);
  }
}
