import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserEntity } from 'src/modules/user/entity/user.entity';

@Injectable()
export class UserRepository extends PrismaClient {
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.user.create({
      data: new UserEntity(createUserDto),
    });
  }

  async findAll(): Promise<User[]> {
    return await this.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.user.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updatedUser: UserEntity): Promise<User | null> {
    return await this.user.update({
      where: {
        id,
      },
      data: {
        ...updatedUser,
        version: updatedUser.version + 1,
        updatedAt: new Date().getTime(),
      },
    });
  }

  async remove(id: string): Promise<User> {
    return await this.user.delete({
      where: {
        id,
      },
    });
  }
}
