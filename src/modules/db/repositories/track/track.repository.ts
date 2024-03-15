import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { PrismaClient, Track } from '@prisma/client';

@Injectable()
export class TrackRepository extends PrismaClient {
  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.track.create({
      data: createTrackDto,
    });
  }

  async findAll(): Promise<Track[]> {
    return await this.track.findMany();
  }

  async findAllByAlbumId(id: string): Promise<Track[]> {
    return await this.track.findMany({
      where: {
        albumId: id,
      },
    });
  }

  async findOne(id: string): Promise<Track | null> {
    return (await this.track.findFirst({ where: { id } })) || null;
  }

  async update(id: string, updatedTrack: Track): Promise<Track> {
    return await this.track.update({
      where: {
        id,
      },
      data: {
        ...updatedTrack,
      },
    });
  }

  async remove(id: string): Promise<Track> {
    return await this.track.delete({
      where: {
        id,
      },
    });
  }
}
