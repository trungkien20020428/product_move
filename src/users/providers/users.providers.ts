import User from '../entities/user.entity';

export const UsersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
