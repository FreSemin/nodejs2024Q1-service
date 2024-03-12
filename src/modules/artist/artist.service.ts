import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { NotFoundError } from 'src/utils';
import { DbService } from '../db/db.service';
import { ArtistEntity } from './entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    return this.dbService.artistRepository.create(createArtistDto);
  }

  findAll(): ArtistEntity[] {
    return this.dbService.artistRepository.findAll();
  }

  findOne(id: string): ArtistEntity {
    const artist: ArtistEntity | null =
      this.dbService.artistRepository.findOne(id);

    if (!artist) {
      // TODO: add message to config or constants
      throw new NotFoundError('Artist not found!');
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistEntity {
    const artist: ArtistEntity = this.findOne(id);

    return this.dbService.artistRepository.update(id, {
      ...artist,
      ...updateArtistDto,
    });
  }

  remove(id: string) {
    this.findOne(id);

    this.dbService.artistRepository.remove(id);
  }
}
