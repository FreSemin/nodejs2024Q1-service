import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { TrackRepository } from '../track/track.repository';
import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { AlbumEntity } from 'src/modules/album/entity/album.entity';

@Injectable()
export class AlbumRepository {
  private album: AlbumEntity[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,

    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,
  ) {}

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const album: AlbumEntity = new AlbumEntity(createAlbumDto);

    this.album.push(album);

    return album;
  }

  findAll(): AlbumEntity[] {
    return this.album;
  }

  findOne(id: string): AlbumEntity | null {
    return this.album.find((album) => album.id === id) || null;
  }

  findAllByArtistId(id: string): AlbumEntity[] {
    return this.album.filter((album) => album.artistId === id);
  }

  update(id: string, updatedAlbum: AlbumEntity): AlbumEntity | null {
    const albumIndex: number = this.album.findIndex((album) => album.id === id);

    if (albumIndex !== -1) {
      this.album[albumIndex] = new AlbumEntity(updatedAlbum);

      return this.album[albumIndex];
    }

    return null;
  }

  remove(id: string): void {
    const albumIndex: number = this.album.findIndex((album) => album.id === id);

    if (albumIndex !== -1) {
      this.album.splice(albumIndex, 1);

      const albumTracks: TrackEntity[] =
        this.trackRepository.findAllByAlbumId(id);

      // TODO: refactor using Prisma
      albumTracks.forEach((track) => {
        this.trackRepository.update(track.id, {
          ...track,
          albumId: null,
        });
      });

      this.favoritesRepository.deleteAlbum(id);

      return;
    }
  }
}
