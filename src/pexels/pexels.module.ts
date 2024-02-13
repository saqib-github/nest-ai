import { Module } from '@nestjs/common';
import { PexelsService } from './pexels.service';
import { PexelsController } from './pexels.controller';

@Module({
  controllers: [PexelsController],
  providers: [PexelsService],
})
export class PexelsModule {}
