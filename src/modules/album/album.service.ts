import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, Artist } from 'src/models';
import { NotFoundError } from 'src/utils';
import { DbService } from '../db/db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.artistId) {
      const artist: Artist | null = this.dbService.artistRepository.findOne(
        createAlbumDto.artistId,
      );

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    return this.dbService.albumRepository.create(createAlbumDto);
  }

  findAll() {
    return this.dbService.albumRepository.findAll();
  }

  findOne(id: string) {
    const album: Album | null = this.dbService.albumRepository.findOne(id);

    if (!album) {
      // TODO: add message to config or constants
      throw new NotFoundError('Album not found!');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album: Album = this.findOne(id);

    if (updateAlbumDto.artistId) {
      const artist: Artist | null = this.dbService.artistRepository.findOne(
        updateAlbumDto.artistId,
      );

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    return this.dbService.albumRepository.update(id, {
      ...album,
      ...updateAlbumDto,
    });
  }

  remove(id: string) {
    this.findOne(id);

    this.dbService.albumRepository.remove(id);
  }
}
