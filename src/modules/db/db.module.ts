import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user/user.entity';
import { ArtistEntity } from './entities/artist/artist.entity';
import { TrackEntity } from './entities/track/track.entity';

@Module({
  providers: [UserEntity, ArtistEntity, TrackEntity],
  exports: [UserEntity, ArtistEntity, TrackEntity],
})
export class DBModule {}
