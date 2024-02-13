import { Controller, Get, Query } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';

@Controller('unsplash')
export class UnsplashController {
  constructor(private readonly unsplashService: UnsplashService) {}

  @Get()
  findAll(@Query() query: { query: string; page: number; per_page: number }) {
    return this.unsplashService.findAll(query);
  }
}
