import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/models';

@Injectable()
export class FavoritesEntity {
  private favorites: Favorites = new Favorites({});

  constructor() {}

  findAll() {
    return this.favorites;
  }
}
