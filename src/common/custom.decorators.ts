import { Logger } from '@nestjs/common';
import { loggers } from 'winston';

// Custom Decorator
//
// Purpose: Provide debug logging of function / method entry  and exit
//          including logging the arguments passed in and the value returned
//
// Userful for debugging purposes
//
export const LogEntryExit = () => {
  // Setup a Logger to log the function entry and exit points
  const logger = new Logger('FunctionEnterExit');

  // record the current date/time this function was called
  const start = Date.now();

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Setup the original Function - so we can call it
    const targetFunc = descriptor.value;
    descriptor.value = function (...args: any[]) {
      // Log the function entry with arguments
      logger.debug(
        `${target.constructor.name}->${propertyKey}(${args}) method called.`,
      );

      // Execute the original function and get the result
      const result = targetFunc.apply(this, args);

      // record the date/time this function ended
      const end = Date.now();

      // Log the function exits with the result
      logger.debug(
        `${propertyKey} method returned value ${result}. Execution Time: ${
          end - start
        } ms.`,
      );

      // Return the result of the original function to the caller
      return result;
    };
  };
};
