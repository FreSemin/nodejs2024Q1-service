import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Album } from 'src/models';
import { NotFoundError } from 'src/utils';
import { DbService } from '../db/db.service';
import { TrackEntity } from './entity/track.entity';
import { ArtistEntity } from '../artist/entity/artist.entity';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    if (createTrackDto.artistId) {
      const artist: ArtistEntity | null =
        this.dbService.artistRepository.findOne(createTrackDto.artistId);

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    if (createTrackDto.albumId) {
      const album: Album | null = this.dbService.albumRepository.findOne(
        createTrackDto.albumId,
      );

      if (!album) {
        throw new NotFoundError('Album not found!');
      }
    }

    return this.dbService.trackRepository.create(createTrackDto);
  }

  findAll(): TrackEntity[] {
    return this.dbService.trackRepository.findAll();
  }

  findOne(id: string): TrackEntity {
    const track: TrackEntity | null =
      this.dbService.trackRepository.findOne(id);

    if (!track) {
      // TODO: add message to config or constants
      throw new NotFoundError('Track not found!');
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackEntity {
    const track: TrackEntity = this.findOne(id);

    if (updateTrackDto.artistId) {
      const artist: ArtistEntity | null =
        this.dbService.artistRepository.findOne(updateTrackDto.artistId);

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    if (updateTrackDto.albumId) {
      const album: Album | null = this.dbService.albumRepository.findOne(
        updateTrackDto.albumId,
      );

      if (!album) {
        throw new NotFoundError('Album not found!');
      }
    }

    return this.dbService.trackRepository.update(id, {
      ...track,
      ...updateTrackDto,
    });
  }

  remove(id: string) {
    this.findOne(id);

    this.dbService.trackRepository.remove(id);
  }
}
