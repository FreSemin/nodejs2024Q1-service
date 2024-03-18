import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user/user.repository';
import { ArtistRepository } from './repositories/artist/artist.repository';
import { TrackRepository } from './repositories/track/track.repository';
import { AlbumRepository } from './repositories/album/album.repository';
import { FavoritesRepository } from './repositories/favorites/favorites.repository';
import { DbService } from './db.service';

@Module({
  providers: [
    UserRepository,
    ArtistRepository,
    TrackRepository,
    AlbumRepository,
    FavoritesRepository,
    DbService,
  ],
  exports: [DbService],
})
export class DBModule {}
