import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/models';

@Injectable()
export class FavoritesEntity {
  private favorites: Favorites = new Favorites({});

  constructor() {}

  findAll(): Favorites {
    return this.favorites;
  }

  addTrack(id: string): void {
    this.favorites.tracks.push(id);
  }

  isFavoriteTrack(id: string): boolean {
    return this.favorites.tracks.find((trackId) => trackId === id)
      ? true
      : false;
  }

  deleteTrack(id: string): void {
    const trackIdIndex: number = this.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (trackIdIndex !== -1) {
      this.favorites.tracks.splice(trackIdIndex, 1);

      return;
    }
  }
}
