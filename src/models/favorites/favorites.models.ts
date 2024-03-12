import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { Album } from '../album/album.models';
import { Artist } from '../artist/artist.models';
export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class Favorites implements IFavorites {
  artists: string[] = [];
  albums: string[] = [];
  tracks: string[] = [];

  constructor(favorites: Partial<IFavorites>) {
    Object.assign(this, favorites);
  }
}

export interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: TrackEntity[];
}

export class FavoritesResponse implements IFavoritesResponse {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: TrackEntity[] = [];

  constructor(favoritesResponse: Partial<IFavoritesResponse>) {
    Object.assign(this, favoritesResponse);
  }
}
