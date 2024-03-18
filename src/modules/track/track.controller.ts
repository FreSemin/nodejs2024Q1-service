import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from 'src/utils';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    try {
      return await this.trackService.create(createTrackDto);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw err;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.trackService.findAll();
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.trackService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw err;
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return await this.trackService.update(id, updateTrackDto);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw err;
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.trackService.remove(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw err;
    }
  }
}
