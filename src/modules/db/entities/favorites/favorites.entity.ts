import { Injectable } from '@nestjs/common';
import { Album, Artist, Favorites, FavoritesResponse, Track } from 'src/models';
import { TrackEntity } from '../track/track.entity';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';

@Injectable()
export class FavoritesEntity {
  private favorites: Favorites = new Favorites({});

  constructor(
    private readonly artistEntity: ArtistEntity,
    private readonly trackEntity: TrackEntity,
    private readonly albumEntity: AlbumEntity,
  ) {}

  findAll(): FavoritesResponse {
    // TODO: refactor using Prisma
    const artists: Artist[] = this.favorites.artists.map((artistId) => {
      return this.artistEntity.findOne(artistId);
    });

    const tracks: Track[] = this.favorites.tracks.map((trackId) => {
      return this.trackEntity.findOne(trackId);
    });

    const albums: Album[] = this.favorites.albums.map((albumId) => {
      return this.albumEntity.findOne(albumId);
    });

    return new FavoritesResponse({
      artists,
      tracks,
      albums,
    });
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

  addArtist(id: string): void {
    this.favorites.artists.push(id);
  }

  isFavoriteArtist(id: string): boolean {
    return this.favorites.artists.find((artistId) => artistId === id)
      ? true
      : false;
  }

  deleteArtist(id: string): void {
    const artistIdIndex: number = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (artistIdIndex !== -1) {
      this.favorites.artists.splice(artistIdIndex, 1);

      return;
    }
  }
}
