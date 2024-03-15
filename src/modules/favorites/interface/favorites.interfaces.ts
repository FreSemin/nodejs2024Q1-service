import {
  Album,
  Artist,
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
  Track,
} from '@prisma/client';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface FavoriteArtistResponse extends FavoriteArtist {
  artist: Artist;
}

export interface FavoriteAlbumResponse extends FavoriteAlbum {
  album: Album;
}

export interface FavoriteTrackResponse extends FavoriteTrack {
  track: Track;
}
