import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/models';

@Injectable()
export class FavoritesEntity {
  private favorites: Favorites = new Favorites({});

  constructor() {}

  findAll() {
    return this.favorites;
  }

  addTrack(id: string): void {
    this.favorites.tracks.push(id);
  }
}
