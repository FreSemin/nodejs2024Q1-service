import { Album, Artist, Track } from '..';

export interface IFavorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class Favorites implements IFavorites {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];

  constructor(favorites: Partial<IFavorites>) {
    Object.assign(this, favorites);
  }
}
