import { TrackEntity } from 'src/modules/track/entity/track.entity';
import { AlbumEntity } from 'src/modules/album/entity/album.entity';
import { ArtistEntity } from 'src/modules/artist/entity/artist.entity';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
