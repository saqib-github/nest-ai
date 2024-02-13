import { Test, TestingModule } from '@nestjs/testing';
import { LinkedinApiController } from './linkedin_api.controller';
import { LinkedinApiService } from './linkedin_api.service';

describe('LinkedinApiController', () => {
  let controller: LinkedinApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkedinApiController],
      providers: [LinkedinApiService],
    }).compile();

    controller = module.get<LinkedinApiController>(LinkedinApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
