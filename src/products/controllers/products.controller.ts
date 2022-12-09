import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { productValidate } from '../validate/product.validate';
import { resType } from '../../type/global.type';

@UseGuards(JwtGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productValidate: productValidate,
  ) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Request() req,
  ): resType {
    const currentUserId = req.user.id;

    const validate = await this.productValidate.validateCreateProduct(
      currentUserId,
    );
    const resFailed = {
      code: 401,
      message: 'Can not create product',
      result: {},
      success: false,
    };
    if (!validate.success) {
      resFailed.message = validate.message;
    }

    const product = await this.productsService.create(createProductDto);
    if (product) {
      return {
        code: 200,
        message: 'create success',
        result: { product },
        success: true,
      };
    }
    return resFailed;
  }

  @ApiBearerAuth()
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
