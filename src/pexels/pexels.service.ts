// pexels.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, Photos } from 'pexels';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PexelsService {
  private readonly client: any;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('PEXELS_API_KEY');
    this.client = createClient(apiKey);
  }

  async findAll(query: {
    query: string;
    page: number;
    per_page: number;
  }): Promise<Photos> {
    const { query: searchStr, page, per_page } = query;
    const photos = await this.client.photos.curated({
      page: page || 1,
      query: searchStr,
      per_page: per_page || 10,
    });

    return photos;
  }
}
