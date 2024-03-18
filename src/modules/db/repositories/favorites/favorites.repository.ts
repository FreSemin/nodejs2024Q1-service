import { Injectable } from '@nestjs/common';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
  PrismaClient,
} from '@prisma/client';
import {
  FavoriteAlbumResponse,
  FavoriteArtistResponse,
  FavoriteTrackResponse,
  FavoritesResponse,
} from 'src/modules/favorites/interface/favorites.interfaces';
@Injectable()
export class FavoritesRepository extends PrismaClient {
  private mapFavoritesResponse<
    T extends
      | FavoriteArtistResponse
      | FavoriteAlbumResponse
      | FavoriteTrackResponse,
    K extends keyof FavoritesResponse,
  >(
    promiseResult: PromiseSettledResult<T[]>,
    propertyToMap: keyof T,
    favoritesProperty: K,
    favoritesRes: FavoritesResponse,
  ): void {
    // TODO: add promise value to constants
    if (promiseResult.status === 'fulfilled') {
      favoritesRes[favoritesProperty] = promiseResult.value.map((item: T) => {
        return { ...item[propertyToMap] };
      }) as FavoritesResponse[K];
    }
  }

  async findAll(): Promise<FavoritesResponse> {
    return await Promise.allSettled([
      this.favoriteArtist.findMany({ include: { artist: true } }),
      this.favoriteAlbum.findMany({ include: { album: true } }),
      this.favoriteTrack.findMany({ include: { track: true } }),
    ]).then(
      ([favoritesArtists, favoritesAlbums, favoritesTracks]: [
        PromiseSettledResult<FavoriteArtistResponse[]>,
        PromiseSettledResult<FavoriteAlbumResponse[]>,
        PromiseSettledResult<FavoriteTrackResponse[]>,
      ]) => {
        const favorites: FavoritesResponse = {
          artists: [],
          albums: [],
          tracks: [],
        };

        this.mapFavoritesResponse(
          favoritesArtists,
          'artist',
          'artists',
          favorites,
        );

        this.mapFavoritesResponse(
          favoritesAlbums,
          'album',
          'albums',
          favorites,
        );

        this.mapFavoritesResponse(
          favoritesTracks,
          'track',
          'tracks',
          favorites,
        );

        return favorites;
      },
    );
  }

  async addTrack(id: string): Promise<FavoriteTrack> {
    return await this.favoriteTrack.create({ data: { trackId: id } });
  }

  async findTrack(id: string): Promise<FavoriteTrack | null> {
    return await this.favoriteTrack.findFirst({ where: { trackId: id } });
  }

  async deleteTrack(favoriteId: string): Promise<FavoriteTrack> {
    return await this.favoriteTrack.delete({ where: { id: favoriteId } });
  }

  async addArtist(id: string): Promise<FavoriteArtist> {
    return await this.favoriteArtist.create({ data: { artistId: id } });
  }

  async findArtist(id: string): Promise<FavoriteArtist | null> {
    return await this.favoriteArtist.findFirst({ where: { artistId: id } });
  }

  async deleteArtist(favoriteId: string): Promise<FavoriteArtist> {
    return await this.favoriteArtist.delete({ where: { id: favoriteId } });
  }

  async addAlbum(id: string): Promise<FavoriteAlbum> {
    return await this.favoriteAlbum.create({ data: { albumId: id } });
  }

  async findAlbum(id: string): Promise<FavoriteAlbum | null> {
    return await this.favoriteAlbum.findFirst({ where: { albumId: id } });
  }

  async deleteAlbum(favoriteId: string): Promise<FavoriteAlbum> {
    return await this.favoriteAlbum.delete({ where: { id: favoriteId } });
  }
}
