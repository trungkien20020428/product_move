import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { productWarrantyService } from '../services/product_warranty.service';
import { CreateWarrantyDto } from '../dto/create_wanrranty.dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('productWarranty')
@ApiTags('ProductWarranty')
@UseGuards(JwtGuard)
export class ProductWarrantyController {
  constructor(
    private readonly productWarrantyService: productWarrantyService,
  ) {}

  @Post()
  @ApiBearerAuth()
  async create(@Body() createWanrrantyDto: CreateWarrantyDto, @Request() req) {
    const uid = req.user.id;
    const result = await this.productWarrantyService.create(
      createWanrrantyDto,
      uid,
    );
    return result;
  }
}
