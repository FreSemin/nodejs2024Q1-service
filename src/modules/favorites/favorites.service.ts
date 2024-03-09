import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist, FavoritesResponse, Track } from 'src/models';
import { FavoritesEntity } from '../db/entities/favorites/favorites.entity';
import { TrackEntity } from '../db/entities/track/track.entity';
import { ArtistEntity } from '../db/entities/artist/artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesEntity: FavoritesEntity,
    private readonly artistEntity: ArtistEntity,
    private readonly trackEntity: TrackEntity,
  ) {}

  findAll(): FavoritesResponse {
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

  addArtist(id: string): string {
    const artist: Artist = this.artistEntity.findOne(id);

    // TODO: refactor add strings to constants
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id = ${id} doesn't exists`,
      );
    }

    this.favoritesEntity.addArtist(id);

    return 'Artist was added to favorites!';
  }

  deleteArtist(id: string): void {
    const isFavorite: boolean = this.favoritesEntity.isFavoriteArtist(id);

    if (!isFavorite) {
      throw new NotFoundException(`Artist with id = ${id} is not favorite!`);
    }

    this.favoritesEntity.deleteArtist(id);
  }
}
