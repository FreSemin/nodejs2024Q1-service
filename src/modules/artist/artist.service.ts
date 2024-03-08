import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from '../db/entities/artist/artist.entity';
import { Album, Artist, Track } from 'src/models';
import { AlbumEntity } from '../db/entities/album/album.entity';
import { TrackEntity } from '../db/entities/track/track.entity';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistEntity: ArtistEntity,
    private readonly albumEntity: AlbumEntity,
    private readonly trackEntity: TrackEntity,
  ) {}

  create(createArtistDto: CreateArtistDto): Artist {
    return this.artistEntity.create(createArtistDto);
  }

  findAll(): Artist[] {
    return this.artistEntity.findAll();
  }

  findOne(id: string): Artist {
    const artist: Artist | null = this.artistEntity.findOne(id);

    if (!artist) {
      // TODO: add message to config or constants
      throw new NotFoundException('Artist not found!');
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist: Artist = this.findOne(id);

    return this.artistEntity.update(id, {
      ...artist,
      ...updateArtistDto,
    });
  }

  remove(id: string) {
    this.findOne(id);

    // TODO: refactor using Prisma
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

    this.artistEntity.remove(id);
  }
}
