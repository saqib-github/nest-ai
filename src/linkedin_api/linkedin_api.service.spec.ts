import { Test, TestingModule } from '@nestjs/testing';
import { LinkedinApiService } from './linkedin_api.service';

describe('LinkedinApiService', () => {
  let service: LinkedinApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkedinApiService],
    }).compile();

    service = module.get<LinkedinApiService>(LinkedinApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
