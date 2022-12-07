import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface userDTO {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  verified: boolean;
  tenant_id: number;
  tenant_name: string;
  tenant_password: string;
}
