import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from '../db/entities/track/track.entity';
import { Album, Artist, Track } from 'src/models';
import { ArtistEntity } from '../db/entities/artist/artist.entity';
import { NotFoundError } from 'src/utils';
import { AlbumEntity } from '../db/entities/album/album.entity';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackEntity: TrackEntity,
    private readonly artistEntity: ArtistEntity,
    private readonly albumEntity: AlbumEntity,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    if (createTrackDto.artistId) {
      const artist: Artist | null = this.artistEntity.findOne(
        createTrackDto.artistId,
      );

      if (!artist) {
        throw new NotFoundError('Artist not found!');
      }
    }

    if (createTrackDto.albumId) {
      const album: Album | null = this.albumEntity.findOne(
        createTrackDto.albumId,
      );

      if (!album) {
        throw new NotFoundError('Album not found!');
      }
    }

    return this.trackEntity.create(createTrackDto);
  }

  findAll(): Track[] {
    return this.trackEntity.findAll();
  }

  findOne(id: string): Track {
    const track: Track | null = this.trackEntity.findOne(id);

    if (!track) {
      // TODO: add message to config or constants
      throw new NotFoundError('Track not found!');
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track: Track = this.findOne(id);

    return this.trackEntity.update(id, {
      ...track,
      ...updateTrackDto,
    });
  }

  remove(id: string) {
    this.findOne(id);

    this.trackEntity.remove(id);
  }
}
