import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DitributionService } from './ditribution.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
// import { CreateDitributionDto } from './dto/create-ditribution.dto';
// import { UpdateDitributionDto } from './dto/update-ditribution.dto';

@UseGuards(JwtGuard)
@Controller('ditribution')
export class DitributionController {
  constructor(private readonly ditributionService: DitributionService) {}
  @Patch('sale')
  async saleProduct() {}
}
