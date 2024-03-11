import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Album, Artist, Track } from 'src/models';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';
import { FavoritesEntity } from '../favorites/favorites.entity';

@Injectable()
export class ArtistEntity {
  private artist: Artist[] = [];

  constructor(
    private readonly albumEntity: AlbumEntity,

    @Inject(forwardRef(() => TrackEntity))
    private readonly trackEntity: TrackEntity,

    @Inject(forwardRef(() => FavoritesEntity))
    private readonly favoritesEntity: FavoritesEntity,
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
      const artistAlbums: Album[] = this.albumEntity.findAllByArtistId(id);

      artistAlbums.forEach((album) => {
        this.albumEntity.update(album.id, {
          ...album,
          artistId: null,
        });
      });

      const artistTracks: Track[] = this.trackEntity.findAllByArtistId(id);

      artistTracks.forEach((track) => {
        this.trackEntity.update(track.id, {
          ...track,
          artistId: null,
        });
      });

      this.favoritesEntity.deleteArtist(id);

      return;
    }
  }
}
