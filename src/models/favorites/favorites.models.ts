import { Album } from '../album/album.models';
import { Artist } from '../artist/artist.models';
import { Track } from '../track/track.models';

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
  tracks: Track[];
}

export class FavoritesResponse implements IFavoritesResponse {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];

  constructor(favoritesResponse: Partial<IFavoritesResponse>) {
    Object.assign(this, favoritesResponse);
  }
}
