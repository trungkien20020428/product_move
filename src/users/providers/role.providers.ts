import Role from '../entities/role.enity';

export const RoleProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useValue: Role,
  },
];
