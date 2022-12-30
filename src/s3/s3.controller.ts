import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { ImageFileDTO } from './imageFile.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
  @Post('')
  @ApiBearerAuth()
  async upload(@UploadedFile() file: ImageFileDTO, @Res() response) {
    console.log(file);
    try {
      const data = await this.s3Service.upload(file);
      return response.status(200).json({
        message: `Image ${file.originalname} uploaded to S3`,
        data,
      });
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image to S3: ${error.message}`);
    }
  }
}
