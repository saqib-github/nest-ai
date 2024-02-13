import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LinkedinApiService } from './linkedin_api.service';
import { CreateLinkedinApiDto } from './dto/create-linkedin_api.dto';
import { UpdateLinkedinApiDto } from './dto/update-linkedin_api.dto';

@Controller('linkedin-api')
export class LinkedinApiController {
  constructor(private readonly linkedinApiService: LinkedinApiService) {}

  @Post('create')
  create(@Body() createLinkedinApiDto: CreateLinkedinApiDto) {
    return this.linkedinApiService.create(createLinkedinApiDto);
  }

  @Get()
  findAll() {
    return this.linkedinApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkedinApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkedinApiDto: UpdateLinkedinApiDto) {
    return this.linkedinApiService.update(+id, updateLinkedinApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkedinApiService.remove(+id);
  }
}
