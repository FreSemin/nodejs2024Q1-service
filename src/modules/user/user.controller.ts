import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusCodes } from 'http-status-codes';
import { ForbiddenError, NotFoundError } from 'src/utils';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (err) {
      throw err;
    }
  }

  // TODO: refactor using get uuid version from config
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.userService.findOne(id);
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
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      }

      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }

      throw err;
    }
  }

  // TODO: add code to config or constants
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.userService.remove(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw err;
    }
  }
}
