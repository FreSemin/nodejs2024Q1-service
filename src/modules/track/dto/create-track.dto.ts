import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID('4')
  artistId?: string;

  @IsOptional()
  @IsUUID('4')
  albumId?: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
