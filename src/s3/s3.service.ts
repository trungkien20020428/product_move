import { Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as process from 'process';

export class S3Service {
  constructor() {}

  async upload(file) {
    const { originalname } = file;
    const S3bucket = process.env.AWS_BUCKET_NAME;
    return await this.uploadS3(file.buffer, S3bucket, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.SERECT_ACCESS_KEY,
      s3ForcePathStyle: true,
      region: process.env.AWS_REGION,
      logger: console,
    });
    const s3Params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };

    const data = await this.uploadImageToS3(s3, s3Params);
    return data;
  }

  async uploadImageToS3(s3: S3, s3Params) {
    return new Promise((resolve, reject) => {
      s3.upload(s3Params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
