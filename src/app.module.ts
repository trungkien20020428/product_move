import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';
import { DitributionModule } from './ditribution/ditribution.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    ProductsModule,
    DitributionModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule {}
