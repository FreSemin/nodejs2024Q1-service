import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../interface/artist.interface';

export class ArtistEntity implements Artist {
  id: string = uuidv4();

  name: string;

  grammy: boolean;

  constructor(artist: Partial<Artist>) {
    Object.assign(this, artist);
  }
}
