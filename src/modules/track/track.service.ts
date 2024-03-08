import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from '../db/entities/track/track.entity';
import { Track } from 'src/models';

@Injectable()
export class TrackService {
  constructor(private readonly trackEntity: TrackEntity) {}

  create(createTrackDto: CreateTrackDto) {
    // TODO: check is artist exist
    // TODO: check is album exist

    return this.trackEntity.create(createTrackDto);
  }

  findAll(): Track[] {
    return this.trackEntity.findAll();
  }

  findOne(id: string): Track {
    const track: Track | null = this.trackEntity.findOne(id);

    if (!track) {
      // TODO: add message to config or constants
      throw new NotFoundException('Track not found!');
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
