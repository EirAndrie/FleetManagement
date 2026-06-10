export type CreateUserDTO = {
  cooperativeId: string; // FK

  firstName: string;
  lastName: string;
  middleName: string;

  email: string;
  passwordHash: string;
  role: string;
  status: string;
};

export type UpdateUserDTO = {
  userId: string;
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  email?: string;
  role?: string;
  status?: string;
};

export type ChangePasswordDTO = {
  userId: string;
  currentPassword: string;
  newPassword: string;
};