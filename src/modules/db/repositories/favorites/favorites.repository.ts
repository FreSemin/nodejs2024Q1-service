import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Album, Favorites, FavoritesResponse } from 'src/models';
import { TrackRepository } from '../track/track.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { AlbumRepository } from '../album/album.repository';
import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { ArtistEntity } from 'src/modules/artist/entity/artist.entity';

@Injectable()
export class FavoritesRepository {
  private favorites: Favorites = new Favorites({});

  constructor(
    @Inject(forwardRef(() => ArtistRepository))
    private readonly artistRepository: ArtistRepository,

    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,

    @Inject(forwardRef(() => AlbumRepository))
    private readonly albumRepository: AlbumRepository,
  ) {}

  findAll(): FavoritesResponse {
    // TODO: refactor using Prisma
    const artists: ArtistEntity[] = this.favorites.artists.map((artistId) => {
      return this.artistRepository.findOne(artistId);
    });

    const tracks: TrackEntity[] = this.favorites.tracks.map((trackId) => {
      return this.trackRepository.findOne(trackId);
    });

    const albums: Album[] = this.favorites.albums.map((albumId) => {
      return this.albumRepository.findOne(albumId);
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

  addAlbum(id: string): void {
    this.favorites.albums.push(id);
  }

  isFavoriteAlbum(id: string): boolean {
    return this.favorites.albums.find((albumId) => albumId === id)
      ? true
      : false;
  }

  deleteAlbum(id: string): void {
    const albumIndex: number = this.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (albumIndex !== -1) {
      this.favorites.albums.splice(albumIndex, 1);

      return;
    }
  }
}
