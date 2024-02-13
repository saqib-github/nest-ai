import { Injectable } from '@nestjs/common';
import { createApi } from 'unsplash-js';
// on your node server
const serverApi = createApi({
  accessKey: 'vy3ihJ2IkMWycsJW3Q2bAqrVoJ07iI-05pprGbo87-Q',
  //...other fetch options
});
@Injectable()
export class UnsplashService {
  async findAll(query: { query: string; page: number; per_page: number }) {
    const photos = await serverApi.search.getPhotos({
      query: query.query || '',
      page: query.page || 1,
      perPage: query.per_page || 10,
    });
    return photos;
  }
}
