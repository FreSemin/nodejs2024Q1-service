import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';
import { Album, PrismaClient } from '@prisma/client';

@Injectable()
export class AlbumRepository extends PrismaClient {
  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.album.create({
      data: {
        ...createAlbumDto,
      },
    });
  }

  async findAll(): Promise<Album[]> {
    return await this.album.findMany();
  }

  async findOne(id: string): Promise<Album | null> {
    return (await this.album.findFirst({ where: { id } })) || null;
  }

  async update(id: string, updatedAlbum: Album): Promise<Album | null> {
    return await this.album.update({
      where: {
        id,
      },
      data: {
        ...updatedAlbum,
      },
    });
  }

  async remove(id: string): Promise<Album> {
    return await this.album.delete({
      where: {
        id,
      },
    });
  }
}
