export type CreateCooperativeDTO = {
  name: string;
  description?: string | null;
  address: string;
  contactNumber: string;
};

export type UpdateCooperativeDTO = {
  cooperativeId?: string;
  name?: string;
  description?: string | null;
  address?: string;
  contactNumber?: string;
};
