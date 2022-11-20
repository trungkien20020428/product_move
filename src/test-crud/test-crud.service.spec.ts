import { Test, TestingModule } from '@nestjs/testing';
import { TestCrudService } from './test-crud.service';

describe('TestCrudService', () => {
  let service: TestCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestCrudService],
    }).compile();

    service = module.get<TestCrudService>(TestCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
