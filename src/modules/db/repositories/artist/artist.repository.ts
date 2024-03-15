import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { Artist, PrismaClient } from '@prisma/client';

@Injectable()
export class ArtistRepository extends PrismaClient {
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artist.create({ data: createArtistDto });
  }

  async findAll(): Promise<Artist[]> {
    return await this.artist.findMany();
  }

  async findOne(id: string): Promise<Artist | null> {
    return (await this.artist.findFirst({ where: { id } })) || null;
  }

  async update(id: string, updatedArtist: Artist): Promise<Artist | null> {
    return await this.artist.update({
      where: {
        id,
      },
      data: {
        ...updatedArtist,
      },
    });
  }

  async remove(id: string): Promise<Artist> {
    return await this.artist.delete({
      where: {
        id,
      },
    });
  }
}
