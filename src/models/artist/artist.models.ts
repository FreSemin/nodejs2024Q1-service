export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(artist: Partial<IArtist>) {
    Object.assign(this, artist);
  }
}
