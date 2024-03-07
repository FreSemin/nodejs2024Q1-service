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

    return this.user;
  }
}
