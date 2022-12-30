import {
  Controller,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DitributionService } from './ditribution.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { resType } from '../type/global.type';
import { SellProductDto } from './dto/sell_product.dto';

@UseGuards(JwtGuard)
@ApiTags('Distribution')
@Controller('ditribution')
export class DitributionController {
  constructor(private readonly ditributionService: DitributionService) {}
  @Patch('sell/:id')
  @ApiBearerAuth()
  async saleProduct(
    @Request() req,
    @Param('id') id: number,
    @Body() sellProductDto: SellProductDto,
  ): resType {
    const uid = req.user.id;
    const resFailed = {
      code: 401,
      success: false,
      message: 'sell failed',
      result: {},
    };

    const result = await this.ditributionService.saleProduct(
      uid,
      +id,
      sellProductDto,
    );
    if (result) {
      return {
        code: 201,
        success: true,
        message: 'get Success',
        result,
      };
    }

    return resFailed;
  }
}
