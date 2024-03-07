import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user/user.entity';
import { ArtistEntity } from './entities/artist/artist.entity';

@Module({
  providers: [UserEntity, ArtistEntity],
  exports: [UserEntity, ArtistEntity],
})
export class DBModule {}
