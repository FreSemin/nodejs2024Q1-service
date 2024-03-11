import { Injectable } from '@nestjs/common';
import { Album, Artist, FavoritesResponse, Track } from 'src/models';
import { NotFoundError, UnprocessableEntityError } from 'src/utils';
import { DbService } from '../db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DbService) {}

  findAll(): FavoritesResponse {
    return this.dbService.favoritesEntity.findAll();
  }

  addTrack(id: string): string {
    const track: Track = this.dbService.trackEntity.findOne(id);

    // TODO: refactor add strings to constants
    if (!track) {
      throw new UnprocessableEntityError(
        `Track with id = ${id} doesn't exists`,
      );
    }

    this.dbService.favoritesEntity.addTrack(id);

    return 'Track was added to favorites!';
  }

  deleteTrack(id: string): void {
    const isFavorite: boolean =
      this.dbService.favoritesEntity.isFavoriteTrack(id);

    if (!isFavorite) {
      throw new NotFoundError(`Track with id = ${id} is not favorite!`);
    }

    this.dbService.favoritesEntity.deleteTrack(id);
  }

  addArtist(id: string): string {
    const artist: Artist = this.dbService.artistEntity.findOne(id);

    // TODO: refactor add strings to constants
    if (!artist) {
      throw new UnprocessableEntityError(
        `Artist with id = ${id} doesn't exists`,
      );
    }

    this.dbService.favoritesEntity.addArtist(id);

    return 'Artist was added to favorites!';
  }

  deleteArtist(id: string): void {
    const isFavorite: boolean =
      this.dbService.favoritesEntity.isFavoriteArtist(id);

    if (!isFavorite) {
      throw new NotFoundError(`Artist with id = ${id} is not favorite!`);
    }

    this.dbService.favoritesEntity.deleteArtist(id);
  }

  addAlbum(id: string): string {
    const album: Album = this.dbService.albumEntity.findOne(id);

    // TODO: refactor add strings to constants
    if (!album) {
      throw new UnprocessableEntityError(
        `Album with id = ${id} doesn't exists`,
      );
    }

    this.dbService.favoritesEntity.addAlbum(id);

    return 'Album was added to favorites!';
  }

  deleteAlbum(id: string): void {
    const isFavorite: boolean =
      this.dbService.favoritesEntity.isFavoriteAlbum(id);

    if (!isFavorite) {
      throw new NotFoundError(`Album with id = ${id} is not favorite!`);
    }

    this.dbService.favoritesEntity.deleteAlbum(id);
  }
}
