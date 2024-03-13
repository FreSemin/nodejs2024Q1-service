import { v4 as uuidv4 } from 'uuid';
import { Track } from '../interface/track.interface';

export class TrackEntity implements Track {
  id: string = uuidv4();

  name: string;

  artistId: string | null = null;

  albumId: string | null = null;

  duration: number = 0;

  constructor(track: Partial<Track>) {
    Object.assign(this, track);
  }
}
