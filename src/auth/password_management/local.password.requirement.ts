/* Purpose: 
    Sets up the local database password requirements 

    Created: 21/10/2022
    Created By: David Graupner
*/

import { PasswordValidationRequirement } from 'class-validator-password-check';

export const localPasswordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};
