import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from '../db/entities/album/album.entity';
import { Album } from 'src/models';

@Injectable()
export class AlbumService {
  constructor(private readonly albumEntity: AlbumEntity) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumEntity.create(createAlbumDto);
  }

  findAll() {
    return this.albumEntity.findAll();
  }

  findOne(id: string) {
    const album: Album | null = this.albumEntity.findOne(id);

    if (!album) {
      // TODO: add message to config or constants
      throw new NotFoundException('Album not found!');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album: Album = this.findOne(id);

    return this.albumEntity.update(id, {
      ...album,
      ...updateAlbumDto,
    });
  }

  remove(id: string) {
    this.findOne(id);

    this.albumEntity.remove(id);
  }
}
