import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Album, Artist, Track } from 'src/models';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { AlbumRepository } from '../album/album.repository';
import { TrackRepository } from '../track/track.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Injectable()
export class ArtistRepository {
  private artist: Artist[] = [];

  constructor(
    private readonly albumRepository: AlbumRepository,

    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,

    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

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

      // TODO: refactor using prisma
      const artistAlbums: Album[] = this.albumRepository.findAllByArtistId(id);

      artistAlbums.forEach((album) => {
        this.albumRepository.update(album.id, {
          ...album,
          artistId: null,
        });
      });

      const artistTracks: Track[] = this.trackRepository.findAllByArtistId(id);

      artistTracks.forEach((track) => {
        this.trackRepository.update(track.id, {
          ...track,
          artistId: null,
        });
      });

      this.favoritesRepository.deleteArtist(id);

      return;
    }
  }
}
