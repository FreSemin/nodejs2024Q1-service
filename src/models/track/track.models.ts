import { v4 as uuidv4 } from 'uuid';

export interface ITRack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class Track implements ITRack {
  id: string = uuidv4();

  name: string;

  artistId: string | null;

  albumId: string | null;

  duration: number;

  constructor(track: Partial<ITRack>) {
    Object.assign(this, track);
  }
}
