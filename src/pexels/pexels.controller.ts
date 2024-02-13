import { Controller, Get, Query } from '@nestjs/common';
import { PexelsService } from './pexels.service';

@Controller('pexels')
export class PexelsController {
  constructor(private readonly pexelsService: PexelsService) {}

  @Get()
  findAll(@Query() query: { query: string, page: number, per_page: number }) {
    return this.pexelsService.findAll(query);
  }
}
