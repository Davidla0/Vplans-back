export enum UserRole {
  ADMIN = 'admin',
  TEACHER1 = 'teacher1',
  STUDENT1 = 'student1',
  MANAGER = 'manager',
}

export const UserRoles = [
  UserRole.ADMIN,
  UserRole.TEACHER1,
  UserRole.STUDENT1,
  UserRole.MANAGER,
];

export const RolePermissions = {
  [UserRole.ADMIN]: ['grades:read'],
  [UserRole.TEACHER1]: ['grades:read:assigned'],
  [UserRole.STUDENT1]: ['grades:read:self'],
  [UserRole.MANAGER]: ['grades:read:student1', 'grades:read:forever2'],
};
