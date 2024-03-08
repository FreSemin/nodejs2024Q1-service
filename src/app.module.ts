import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
