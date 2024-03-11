import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user/user.entity';
import { TrackEntity } from './entities/track/track.entity';
import { ArtistEntity } from './entities/artist/artist.entity';
import { AlbumEntity } from './entities/album/album.entity';
import { FavoritesEntity } from './entities/favorites/favorites.entity';

@Injectable()
export class DbService {
  constructor(
    readonly userEntity: UserEntity,
    readonly artistEntity: ArtistEntity,
    readonly trackEntity: TrackEntity,
    readonly albumEntity: AlbumEntity,
    readonly favoritesEntity: FavoritesEntity,
  ) {}
}
