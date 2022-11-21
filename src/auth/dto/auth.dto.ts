import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { localPasswordRequirement } from '../password_management';
import { PasswordValidation } from 'class-validator-password-check';

/* Data Transfer Object for Local Login Access*/
export class localLoginDTO {
  @IsEmail()
  @IsNotEmpty({
    message: 'Email address is required as your login name',
  })
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @Validate(PasswordValidation, [localPasswordRequirement])
  password: string;
}
