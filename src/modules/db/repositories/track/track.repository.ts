import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Track } from 'src/models';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Injectable()
export class TrackRepository {
  private track: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  create(createTrackDto: CreateTrackDto): Track {
    const track: Track = new Track(createTrackDto);

    this.track.push(track);

    return track;
  }

  findAll(): Track[] {
    return this.track;
  }

  findAllByAlbumId(id: string): Track[] {
    return this.track.filter((track) => track.albumId === id);
  }

  findAllByArtistId(id: string): Track[] {
    return this.track.filter((track) => track.artistId === id);
  }

  findOne(id: string): Track | null {
    return this.track.find((track) => track.id === id) || null;
  }

  update(id: string, updatedTrack: Track): Track | null {
    const trackIndex: number = this.track.findIndex((track) => track.id === id);

    if (trackIndex !== -1) {
      this.track[trackIndex] = new Track(updatedTrack);

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
