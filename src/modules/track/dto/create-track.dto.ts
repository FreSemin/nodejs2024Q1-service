import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  artistId: string;

  albumId: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
