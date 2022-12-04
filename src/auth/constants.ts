/* 
Custom messages for the API
*/
export const CREDENTIALS_INCORRECT = 'You have supplied incorrect credentials';
export const ACCESS_TOKEN_REVOKED = 'Your access token has been revoked';

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
