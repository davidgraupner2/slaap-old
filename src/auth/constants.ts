/* 
Custom messages for the API
*/
export const CREDENTIALS_INCORRECT = 'You have supplied incorrect credentials';
export const ACCESS_TOKEN_REVOKED = 'Your access token has been revoked';
export const TENANT_NOT_FOUND = 'Tenant not found to validate your credentials';
export const ONLY_MSP_PUBLIC = 'Only MSP Users can login to the public tenant';
export const TENANT_NO_ACCESS = 'No access to requested Tenant';

/* 
Metadata flag for public flagged routes 
*/
export const IS_PUBLIC_KEY = 'isPublic';

/* 
Enum for determining a login vs refresh token action
*/
export const enum TokenActionTypeEnum {
  login = 1,
  refreshToken = 2,
}
