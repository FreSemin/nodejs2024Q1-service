import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Album } from 'src/models';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { AlbumRepository } from '../album/album.repository';
import { TrackRepository } from '../track/track.repository';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { ArtistEntity } from 'src/modules/artist/entity/artist.entity';

@Injectable()
export class ArtistRepository {
  private artist: ArtistEntity[] = [];

  constructor(
    private readonly albumRepository: AlbumRepository,

    @Inject(forwardRef(() => TrackRepository))
    private readonly trackRepository: TrackRepository,

    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    const artist: ArtistEntity = new ArtistEntity(createArtistDto);

    this.artist.push(artist);

    return artist;
  }

  findAll(): ArtistEntity[] {
    return this.artist;
  }

  findOne(id: string): ArtistEntity | null {
    return this.artist.find((artist) => artist.id === id) || null;
  }

  update(id: string, updatedArtist: ArtistEntity): ArtistEntity | null {
    const artistIndex: number = this.artist.findIndex(
      (artist) => artist.id === id,
    );

    if (artistIndex !== -1) {
      this.artist[artistIndex] = new ArtistEntity(updatedArtist);

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

      const artistTracks: TrackEntity[] =
        this.trackRepository.findAllByArtistId(id);

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
