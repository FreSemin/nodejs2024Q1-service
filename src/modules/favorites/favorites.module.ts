import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DBModule } from '../db/db.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [DBModule],
})
export class FavoritesModule {}
