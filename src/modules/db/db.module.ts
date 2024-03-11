import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user/user.entity';
import { ArtistEntity } from './entities/artist/artist.entity';
import { TrackEntity } from './entities/track/track.entity';
import { AlbumEntity } from './entities/album/album.entity';
import { FavoritesEntity } from './entities/favorites/favorites.entity';
import { DbService } from './db.service';

@Module({
  providers: [
    UserEntity,
    ArtistEntity,
    TrackEntity,
    AlbumEntity,
    FavoritesEntity,
    DbService,
  ],
  exports: [DbService],
})
export class DBModule {}
