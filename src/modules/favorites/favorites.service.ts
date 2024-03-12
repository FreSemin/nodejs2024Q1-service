import { Injectable } from '@nestjs/common';
import { Album, Artist, FavoritesResponse } from 'src/models';
import { NotFoundError, UnprocessableEntityError } from 'src/utils';
import { DbService } from '../db/db.service';
import { TrackEntity } from '../track/entity/track.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DbService) {}

  findAll(): FavoritesResponse {
    return this.dbService.favoritesRepository.findAll();
  }

  addTrack(id: string): string {
    const track: TrackEntity = this.dbService.trackRepository.findOne(id);

    // TODO: refactor add strings to constants
    if (!track) {
      throw new UnprocessableEntityError(
        `Track with id = ${id} doesn't exists`,
      );
    }

    this.dbService.favoritesRepository.addTrack(id);

    return 'Track was added to favorites!';
  }

  deleteTrack(id: string): void {
    const isFavorite: boolean =
      this.dbService.favoritesRepository.isFavoriteTrack(id);

    if (!isFavorite) {
      throw new NotFoundError(`Track with id = ${id} is not favorite!`);
    }

    this.dbService.favoritesRepository.deleteTrack(id);
  }

  addArtist(id: string): string {
    const artist: Artist = this.dbService.artistRepository.findOne(id);

    // TODO: refactor add strings to constants
    if (!artist) {
      throw new UnprocessableEntityError(
        `Artist with id = ${id} doesn't exists`,
      );
    }

    this.dbService.favoritesRepository.addArtist(id);

    return 'Artist was added to favorites!';
  }

  deleteArtist(id: string): void {
    const isFavorite: boolean =
      this.dbService.favoritesRepository.isFavoriteArtist(id);

    if (!isFavorite) {
      throw new NotFoundError(`Artist with id = ${id} is not favorite!`);
    }

    this.dbService.favoritesRepository.deleteArtist(id);
  }

  addAlbum(id: string): string {
    const album: Album = this.dbService.albumRepository.findOne(id);

    // TODO: refactor add strings to constants
    if (!album) {
      throw new UnprocessableEntityError(
        `Album with id = ${id} doesn't exists`,
      );
    }

    this.dbService.favoritesRepository.addAlbum(id);

    return 'Album was added to favorites!';
  }

  deleteAlbum(id: string): void {
    const isFavorite: boolean =
      this.dbService.favoritesRepository.isFavoriteAlbum(id);

    if (!isFavorite) {
      throw new NotFoundError(`Album with id = ${id} is not favorite!`);
    }

    this.dbService.favoritesRepository.deleteAlbum(id);
  }
}
