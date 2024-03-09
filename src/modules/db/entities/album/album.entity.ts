import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Album, Track } from 'src/models';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';
import { FavoritesEntity } from '../favorites/favorites.entity';
import { TrackEntity } from '../track/track.entity';

@Injectable()
export class AlbumEntity {
  private album: Album[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesEntity))
    private readonly favoritesEntity: FavoritesEntity,

    @Inject(forwardRef(() => TrackEntity))
    private readonly trackEntity: TrackEntity,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const album: Album = new Album(createAlbumDto);

    this.album.push(album);

    return album;
  }

  findAll(): Album[] {
    return this.album;
  }

  findOne(id: string): Album | null {
    return this.album.find((album) => album.id === id) || null;
  }

  findAllByArtistId(id: string): Album[] {
    return this.album.filter((album) => album.artistId === id);
  }

  update(id: string, updatedAlbum: Album): Album | null {
    const albumIndex: number = this.album.findIndex((album) => album.id === id);

    if (albumIndex !== -1) {
      this.album[albumIndex] = new Album(updatedAlbum);

      return this.album[albumIndex];
    }

    return null;
  }

  remove(id: string): void {
    const albumIndex: number = this.album.findIndex((album) => album.id === id);

    if (albumIndex !== -1) {
      this.album.splice(albumIndex, 1);

      const albumTracks: Track[] = this.trackEntity.findAllByAlbumId(id);

      // TODO: refactor using Prisma
      albumTracks.forEach((track) => {
        this.trackEntity.update(track.id, {
          ...track,
          albumId: null,
        });
      });

      this.favoritesEntity.deleteAlbum(id);

      return;
    }
  }
}
