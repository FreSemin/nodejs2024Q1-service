import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { Album } from '../album/album.models';
import { ArtistEntity } from 'src/modules/artist/entity/artist.entity';
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
  artists: ArtistEntity[];
  albums: Album[];
  tracks: TrackEntity[];
}

export class FavoritesResponse implements IFavoritesResponse {
  artists: ArtistEntity[] = [];
  albums: Album[] = [];
  tracks: TrackEntity[] = [];

  constructor(favoritesResponse: Partial<IFavoritesResponse>) {
    Object.assign(this, favoritesResponse);
  }
}
