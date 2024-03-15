import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { NotFoundError } from 'src/utils';
import { DbService } from '../db/db.service';
import { Album, Artist } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    if (createAlbumDto.artistId) {
      const artist: Artist | null =
        await this.dbService.artistRepository.findOne(createAlbumDto.artistId);

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    return await this.dbService.albumRepository.create(createAlbumDto);
  }

  async findAll(): Promise<Album[]> {
    return await this.dbService.albumRepository.findAll();
  }

  async findOne(id: string): Promise<Album | null> {
    const album: Album | null =
      await this.dbService.albumRepository.findOne(id);

    if (!album) {
      // TODO: add message to config or constants
      throw new NotFoundError('Album not found!');
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album: Album = await this.findOne(id);

    if (updateAlbumDto.artistId) {
      const artist: Artist | null =
        await this.dbService.artistRepository.findOne(updateAlbumDto.artistId);

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    return await this.dbService.albumRepository.update(id, {
      ...album,
      ...updateAlbumDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.dbService.albumRepository.remove(id);
  }
}
