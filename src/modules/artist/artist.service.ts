import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { NotFoundError } from 'src/utils';
import { DbService } from '../db/db.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.dbService.artistRepository.create(createArtistDto);
  }

  async findAll(): Promise<Artist[]> {
    return await this.dbService.artistRepository.findAll();
  }

  async findOne(id: string): Promise<Artist> {
    const artist: Artist | null =
      await this.dbService.artistRepository.findOne(id);

    if (!artist) {
      // TODO: add message to config or constants
      throw new NotFoundError('Artist not found!');
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist: Artist = await this.findOne(id);

    return await this.dbService.artistRepository.update(id, {
      ...artist,
      ...updateArtistDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.dbService.artistRepository.remove(id);
  }
}
