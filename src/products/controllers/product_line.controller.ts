import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AddProductLineDto } from '../dto/addProductLine.dto';
import { productLineService } from '../services/product_line.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { respone } from '../../type/respone.type';
import { productValidate } from '../validate/products.validate';

@UseGuards(JwtGuard)
@ApiTags('product_line')
@Controller('product_line')
export class ProductLineController {
  constructor(
    private productLineService: productLineService,
    private productValidate: productValidate,
  ) {}
  @ApiBearerAuth()
  @Post()
  async addOne(
    @Body() addProductLineDto: AddProductLineDto,
    @Request() req,
  ): Promise<respone> {
    const { name } = addProductLineDto;
    const currentUserId = req.user.id;
    const resFailed = {
      code: 401,
      success: false,
      message: 'Add product line failed',
      result: {},
    };
    const validate = await this.productValidate.validateAddNewProductLine(
      name,
      currentUserId,
    );
    if (validate.isValid) {
      resFailed.message = validate.message;
    } else {
      const addProductLine = await this.productLineService.add(name);
      if (addProductLine) {
        return {
          code: 201,
          success: true,
          message: 'Add product line success',
          result: {},
        };
      }
    }
    return resFailed;
  }
}
