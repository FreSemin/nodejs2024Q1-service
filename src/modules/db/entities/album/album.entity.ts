import { Injectable } from '@nestjs/common';
import { Album } from 'src/models';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';

@Injectable()
export class AlbumEntity {
  private album: Album[] = [];

  constructor() {}

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

      return;
    }
  }
}
