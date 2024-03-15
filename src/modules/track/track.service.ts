import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { NotFoundError } from 'src/utils';
import { DbService } from '../db/db.service';
import { Album, Artist, Track } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DbService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    if (createTrackDto.artistId) {
      const artist: Artist | null =
        await this.dbService.artistRepository.findOne(createTrackDto.artistId);

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    if (createTrackDto.albumId) {
      const album: Album | null = await this.dbService.albumRepository.findOne(
        createTrackDto.albumId,
      );

      if (!album) {
        throw new NotFoundError('Album not found!');
      }
    }

    return await this.dbService.trackRepository.create(createTrackDto);
  }

  async findAll(): Promise<Track[]> {
    return await this.dbService.trackRepository.findAll();
  }

  async findOne(id: string): Promise<Track> {
    const track: Track | null =
      await this.dbService.trackRepository.findOne(id);

    if (!track) {
      // TODO: add message to config or constants
      throw new NotFoundError('Track not found!');
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track: Track = await this.findOne(id);

    if (updateTrackDto.artistId) {
      const artist: Artist | null =
        await this.dbService.artistRepository.findOne(updateTrackDto.artistId);

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    if (updateTrackDto.albumId) {
      const album: Album | null = await this.dbService.albumRepository.findOne(
        updateTrackDto.albumId,
      );

      if (!album) {
        throw new NotFoundError('Album not found!');
      }
    }

    return await this.dbService.trackRepository.update(id, {
      ...track,
      ...updateTrackDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.dbService.trackRepository.remove(id);
  }
}
