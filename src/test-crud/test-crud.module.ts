import { Module } from '@nestjs/common';
import { TestCrudService } from './test-crud.service';
import { TestCrudController } from './test-crud.controller';

@Module({
  controllers: [TestCrudController],
  providers: [TestCrudService]
})
export class TestCrudModule {}
