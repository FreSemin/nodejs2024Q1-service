import { AlbumEntity } from 'src/modules/album/entity/album.entity';
import { ArtistEntity } from 'src/modules/artist/entity/artist.entity';
import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { Favorites, FavoritesResponse } from '../interface/favorites.interface';

export class FavoritesEntity implements Favorites {
  artists: string[] = [];
  albums: string[] = [];
  tracks: string[] = [];

  constructor(favorites: Partial<Favorites>) {
    Object.assign(this, favorites);
  }
}

export class FavoritesResponseEntity implements FavoritesResponse {
  artists: ArtistEntity[] = [];
  albums: AlbumEntity[] = [];
  tracks: TrackEntity[] = [];

  constructor(favoritesResponse: Partial<FavoritesResponse>) {
    Object.assign(this, favoritesResponse);
  }
}
