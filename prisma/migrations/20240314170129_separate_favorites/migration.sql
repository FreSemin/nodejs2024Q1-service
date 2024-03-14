/*
  Warnings:

  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "favorites";

-- DropEnum
DROP TYPE "FavoriteType";

-- CreateTable
CREATE TABLE "favorites_artists" (
    "id" UUID NOT NULL,
    "artistId" UUID NOT NULL,

    CONSTRAINT "favorites_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites_albums" (
    "id" UUID NOT NULL,
    "albumId" UUID NOT NULL,

    CONSTRAINT "favorites_albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites_tracks" (
    "id" UUID NOT NULL,
    "trackId" UUID NOT NULL,

    CONSTRAINT "favorites_tracks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorites_artists" ADD CONSTRAINT "favorites_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_albums" ADD CONSTRAINT "favorites_albums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites_tracks" ADD CONSTRAINT "favorites_tracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
