import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersProviders } from './providers/users.providers';
import { UserValidate } from './validate/users.validate';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserValidate, ...UsersProviders],
  exports: [UsersService, ...UsersProviders, UserValidate],
})
export class UsersModule {}
