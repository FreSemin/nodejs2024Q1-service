import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, UnprocessableEntityError } from 'src/utils';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    try {
      return this.favoritesService.findAll();
    } catch (err) {
      throw err;
    }
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.addTrack(id);
    } catch (err) {
      if (err instanceof UnprocessableEntityError) {
        throw new UnprocessableEntityException(err.message);
      }

      throw err;
    }
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.favoritesService.deleteTrack(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw err;
    }
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.addArtist(id);
    } catch (err) {
      if (err instanceof UnprocessableEntityError) {
        throw new UnprocessableEntityException(err.message);
      }

      throw err;
    }
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.favoritesService.deleteArtist(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw err;
    }
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.addAlbum(id);
    } catch (err) {
      if (err instanceof UnprocessableEntityError) {
        throw new UnprocessableEntityException(err.message);
      }

      throw err;
    }
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.favoritesService.deleteAlbum(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw err;
    }
  }
}
