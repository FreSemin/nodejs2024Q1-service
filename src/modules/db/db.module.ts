import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Module({
  providers: [UserEntity],
  exports: [UserEntity],
})
export class DBModule {}
