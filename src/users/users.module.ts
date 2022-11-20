import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersProviders } from './providers/users.providers';
import { RoleProviders } from './providers/role.providers';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...UsersProviders, ...RoleProviders],
  exports: [UsersService, ...UsersProviders, ...RoleProviders],
})
export class UsersModule {}
