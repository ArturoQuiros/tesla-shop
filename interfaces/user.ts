export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: IRoles;
  createdAt?: string;
  updatedAt?: string;
}

export type IRoles = "admin" | "client";
