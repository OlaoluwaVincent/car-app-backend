import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
  Customer = 'PROVIDE',
}

export const ROLES_KEY = 'role';
export const Roles = (role: Role) => {
  return SetMetadata(ROLES_KEY, role);
};
