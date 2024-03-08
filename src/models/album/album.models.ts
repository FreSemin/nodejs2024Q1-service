import { v4 as uuidv4 } from 'uuid';

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class Album implements IAlbum {
  id: string = uuidv4();

  name: string;

  year: number;

  artistId: string;

  constructor(album: Partial<IAlbum>) {
    Object.assign(this, album);
  }
}
