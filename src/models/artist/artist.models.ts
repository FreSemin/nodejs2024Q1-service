import { v4 as uuidv4 } from 'uuid';

export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

export class Artist implements IArtist {
  id: string = uuidv4();

  name: string;

  grammy: boolean;

  constructor(artist: Partial<IArtist>) {
    Object.assign(this, artist);
  }
}
