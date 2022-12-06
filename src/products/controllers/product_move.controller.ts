import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('product_move')
@ApiTags('product_move')
export class ProductMoveController {
  constructor() {}
}
