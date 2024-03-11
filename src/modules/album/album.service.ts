import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from '../db/entities/album/album.entity';
import { Album, Artist } from 'src/models';
import { ArtistEntity } from '../db/entities/artist/artist.entity';
import { NotFoundError } from 'src/utils';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumEntity: AlbumEntity,
    private readonly artistEntity: ArtistEntity,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.artistId) {
      const artist: Artist | null = this.artistEntity.findOne(
        createAlbumDto.artistId,
      );

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    return this.albumEntity.create(createAlbumDto);
  }

  findAll() {
    return this.albumEntity.findAll();
  }

  findOne(id: string) {
    const album: Album | null = this.albumEntity.findOne(id);

    if (!album) {
      // TODO: add message to config or constants
      throw new NotFoundError('Album not found!');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album: Album = this.findOne(id);

    if (updateAlbumDto.artistId) {
      const artist: Artist | null = this.artistEntity.findOne(
        updateAlbumDto.artistId,
      );

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

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
