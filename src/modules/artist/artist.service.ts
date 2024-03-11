import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from '../db/entities/artist/artist.entity';
import { Artist } from 'src/models';
import { NotFoundError } from 'src/utils';

@Injectable()
export class ArtistService {
  constructor(private readonly artistEntity: ArtistEntity) {}

  create(createArtistDto: CreateArtistDto): Artist {
    return this.artistEntity.create(createArtistDto);
  }

  findAll(): Artist[] {
    return this.artistEntity.findAll();
  }

  findOne(id: string): Artist {
    const artist: Artist | null = this.artistEntity.findOne(id);

    if (!artist) {
      // TODO: add message to config or constants
      throw new NotFoundError('Artist not found!');
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist: Artist = this.findOne(id);

    return this.artistEntity.update(id, {
      ...artist,
      ...updateArtistDto,
    });
  }

  remove(id: string) {
    this.findOne(id);

    this.artistEntity.remove(id);
  }
}
