import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsUUID('4')
  artistId: string;
}
