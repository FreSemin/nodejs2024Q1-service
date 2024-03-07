import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user/user.entity';

@Module({
  providers: [UserEntity],
  exports: [UserEntity],
})
export class DBModule {}
