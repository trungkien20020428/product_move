import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({ example: 5 })
  amount: number;

  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  distributionId: number;
  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  productLineId: number;
  @IsNotEmpty()
  @ApiProperty({ example: `vinfast_haha` })
  productName: string;
}
