import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user/user.repository';
import { TrackRepository } from './repositories/track/track.repository';
import { ArtistRepository } from './repositories/artist/artist.repository';
import { AlbumRepository } from './repositories/album/album.repository';
import { FavoritesRepository } from './repositories/favorites/favorites.repository';

@Injectable()
export class DbService {
  constructor(
    readonly userRepository: UserRepository,
    readonly artistRepository: ArtistRepository,
    readonly trackRepository: TrackRepository,
    readonly albumRepository: AlbumRepository,
    readonly favoritesRepository: FavoritesRepository,
  ) {}
}
