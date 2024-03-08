import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUUID('4')
  artistId: string;

  @IsNotEmpty()
  @IsUUID('4')
  albumId: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
