import { Injectable } from '@nestjs/common';
import { CreateTestCrudDto } from './dto/create-test-crud.dto';
import { UpdateTestCrudDto } from './dto/update-test-crud.dto';

@Injectable()
export class TestCrudService {
  create(createTestCrudDto: CreateTestCrudDto) {
    return 'This action adds a new testCrud';
  }

  findAll() {
    return `This action returns all testCrud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testCrud`;
  }

  update(id: number, updateTestCrudDto: UpdateTestCrudDto) {
    return `This action updates a #${id} testCrud`;
  }

  remove(id: number) {
    return `This action removes a #${id} testCrud`;
  }
}
