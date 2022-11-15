import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check';

var passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};

/* Main User Data Transfer Object 
- User to shape and validate data for the API */
export class userDTO {
  @IsEmail()
  @IsNotEmpty({
    message: 'Email address is required as it will be used as your login name',
  })
  email: string;

  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
}
