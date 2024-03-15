import { Injectable } from '@nestjs/common';
import { NotFoundError, UnprocessableEntityError } from 'src/utils';
import { DbService } from '../db/db.service';
import {
  Album,
  Artist,
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
  Track,
} from '@prisma/client';
import { FavoritesResponse } from './interface/favorites.interfaces';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DbService) {}

  async findAll(): Promise<FavoritesResponse> {
    return await this.dbService.favoritesRepository.findAll();
  }

  async addTrack(id: string): Promise<string> {
    const track: Track = await this.dbService.trackRepository.findOne(id);

    // TODO: refactor add strings to constants
    if (!track) {
      throw new UnprocessableEntityError(
        `Track with id = ${id} doesn't exists`,
      );
    }

    await this.dbService.favoritesRepository.addTrack(id);

    return 'Track was added to favorites!';
  }

  async deleteTrack(id: string): Promise<void> {
    const favoriteTrack: FavoriteTrack =
      await this.dbService.favoritesRepository.findTrack(id);

    if (!favoriteTrack) {
      throw new NotFoundError(`Track with id = ${id} is not favorite!`);
    }

    await this.dbService.favoritesRepository.deleteTrack(favoriteTrack.id);
  }

  async addArtist(id: string): Promise<string> {
    const artist: Artist = await this.dbService.artistRepository.findOne(id);

    // TODO: refactor add strings to constants
    if (!artist) {
      throw new UnprocessableEntityError(
        `Artist with id = ${id} doesn't exists`,
      );
    }

    await this.dbService.favoritesRepository.addArtist(id);

    return 'Artist was added to favorites!';
  }

  async deleteArtist(id: string): Promise<void> {
    const favoriteArtist: FavoriteArtist =
      await this.dbService.favoritesRepository.findArtist(id);

    if (!favoriteArtist) {
      throw new NotFoundError(`Artist with id = ${id} is not favorite!`);
    }

    await this.dbService.favoritesRepository.deleteArtist(favoriteArtist.id);
  }

  async addAlbum(id: string): Promise<string> {
    const album: Album = await this.dbService.albumRepository.findOne(id);

    // TODO: refactor add strings to constants
    if (!album) {
      throw new UnprocessableEntityError(
        `Album with id = ${id} doesn't exists`,
      );
    }

    await this.dbService.favoritesRepository.addAlbum(id);

    return 'Album was added to favorites!';
  }

  async deleteAlbum(id: string): Promise<void> {
    const favoriteAlbum: FavoriteAlbum =
      await this.dbService.favoritesRepository.findAlbum(id);

    if (!favoriteAlbum) {
      throw new NotFoundError(`Album with id = ${id} is not favorite!`);
    }

    await this.dbService.favoritesRepository.deleteAlbum(favoriteAlbum.id);
  }
}
