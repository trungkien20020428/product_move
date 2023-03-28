import { ApiPropertyOptional } from '@nestjs/swagger';

export class ImageFileDTO {
  @ApiPropertyOptional()
  fieldname?: string;

  @ApiPropertyOptional()
  originalname?: string;

  @ApiPropertyOptional()
  encoding?: string;

  @ApiPropertyOptional()
  mimetype?: string;

  @ApiPropertyOptional()
  buffer?: any;

  @ApiPropertyOptional()
  size?: number;
}
