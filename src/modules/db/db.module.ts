import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user/user.entity';
import { ArtistEntity } from './entities/artist/artist.entity';
import { TrackEntity } from './entities/track/track.entity';
import { AlbumEntity } from './entities/album/album.entity';

@Module({
  providers: [UserEntity, ArtistEntity, TrackEntity, AlbumEntity],
  exports: [UserEntity, ArtistEntity, TrackEntity, AlbumEntity],
})
export class DBModule {}
