import { Controller, Get, Query } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('ports')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get()
  @ApiQuery({ name: 'question' })
  GeminiChatBot(@Query() query: { question: string }) {
    return this.geminiService.geminiChat(query);
  }
}
