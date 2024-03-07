import { Injectable } from '@nestjs/common';
import { Artist } from 'src/models/artist/artist.models';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';

@Injectable()
export class ArtistEntity {
  private artist: Artist[] = [];

  constructor() {}

  create(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = new Artist(createArtistDto);

    this.artist.push(artist);

    return artist;
  }

  findAll(): Artist[] {
    return this.artist;
  }

  findOne(id: string): Artist | null {
    return this.artist.find((artist) => artist.id === id) || null;
  }

  update(id: string, updatedArtist: Artist): Artist | null {
    const artistIndex: number = this.artist.findIndex(
      (artist) => artist.id === id,
    );

    if (artistIndex !== -1) {
      this.artist[artistIndex] = new Artist(updatedArtist);

      return this.artist[artistIndex];
    }

    return null;
  }

  remove(id: string): void {
    const artistIndex: number = this.artist.findIndex(
      (artist) => artist.id === id,
    );

    if (artistIndex !== -1) {
      this.artist.splice(artistIndex, 1);

      return;
    }
  }
}
