import { PartialType } from '@nestjs/swagger';
import { CreateTestCrudDto } from './create-test-crud.dto';

export class UpdateTestCrudDto extends PartialType(CreateTestCrudDto) {}
