import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DBModule } from '../db/db.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DBModule],
})
export class AlbumModule {}
