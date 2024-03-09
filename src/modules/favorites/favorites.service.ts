import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites, Track } from 'src/models';
import { FavoritesEntity } from '../db/entities/favorites/favorites.entity';
import { TrackEntity } from '../db/entities/track/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesEntity: FavoritesEntity,
    private readonly trackEntity: TrackEntity,
  ) {}

  findAll(): Favorites {
    return this.favoritesEntity.findAll();
  }

  addTrack(id: string): string {
    const track: Track = this.trackEntity.findOne(id);

    // TODO: refactor add strings to constants
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id = ${id} doesn't exists`,
      );
    }

    this.favoritesEntity.addTrack(id);

    return 'Track was added to favorites!';
  }

  deleteTrack(id: string): void {
    const isFavorite: boolean = this.favoritesEntity.isFavoriteTrack(id);

    if (!isFavorite) {
      throw new NotFoundException(`Track with id = ${id} is not favorite!`);
    }

    this.favoritesEntity.deleteTrack(id);
  }
}
