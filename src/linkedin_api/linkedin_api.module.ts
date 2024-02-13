import { Module } from '@nestjs/common';
import { LinkedinApiService } from './linkedin_api.service';
import { LinkedinApiController } from './linkedin_api.controller';

@Module({
  controllers: [LinkedinApiController],
  providers: [LinkedinApiService],
})
export class LinkedinApiModule {}
