import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/models';
import { FavoritesEntity } from '../db/entities/favorites/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesEntity: FavoritesEntity) {}

  findAll(): Favorites {
    return this.favoritesEntity.findAll();
  }
}
