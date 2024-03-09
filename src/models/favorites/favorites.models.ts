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
