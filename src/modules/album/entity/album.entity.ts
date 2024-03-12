import { v4 as uuidv4 } from 'uuid';
import { Album } from '../interface/album.interface';

export class AlbumEntity implements Album {
  id: string = uuidv4();

  name: string;

  year: number;

  artistId: string | null = null;

  constructor(album: Partial<Album>) {
    Object.assign(this, album);
  }
}
