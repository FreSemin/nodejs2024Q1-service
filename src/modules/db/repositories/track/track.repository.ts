import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { TrackEntity } from 'src/modules/track/entity/track.entity';

@Injectable()
export class TrackRepository {
  private track: TrackEntity[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  create(createTrackDto: CreateTrackDto): TrackEntity {
    const track: TrackEntity = new TrackEntity(createTrackDto);

    this.track.push(track);

    return track;
  }

  findAll(): TrackEntity[] {
    return this.track;
  }

  findAllByAlbumId(id: string): TrackEntity[] {
    return this.track.filter((track) => track.albumId === id);
  }

  findAllByArtistId(id: string): TrackEntity[] {
    return this.track.filter((track) => track.artistId === id);
  }

  findOne(id: string): TrackEntity | null {
    return this.track.find((track) => track.id === id) || null;
  }

  update(id: string, updatedTrack: TrackEntity): TrackEntity | null {
    const trackIndex: number = this.track.findIndex((track) => track.id === id);

    if (trackIndex !== -1) {
      this.track[trackIndex] = new TrackEntity(updatedTrack);

      return this.track[trackIndex];
    }

    return null;
  }

  remove(id: string): void {
    const trackIndex: number = this.track.findIndex((track) => track.id === id);

    if (trackIndex !== -1) {
      this.track.splice(trackIndex, 1);

      this.favoritesRepository.deleteTrack(id);

      return;
    }
  }
}
