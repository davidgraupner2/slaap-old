import { createParamDecorator } from '@nestjs/common';

// Custom decorator to get access to the user object on the request object
export const User = createParamDecorator((data, req) => {
  return req.user;
});
