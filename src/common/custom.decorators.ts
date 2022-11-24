import { Logger } from '@nestjs/common';
import { loggers } from 'winston';

// Custom Decorator
//
// Purpose: Provide debug logging of function / method entry  and exit
//          including logging the arguments passed in and the value returned
//
// Userful for debugging purposes
//
export const LogEntryExit = (target, methodName, descriptor) => {
  // Setup a Logger to log the function entry and exit points
  const logger = new Logger('FunctionEnterExit');

  // Get the classname
  const className = target.constructor.name;

  // Get the method being called
  const targetMethod = descriptor.value;

  descriptor.value = new Proxy(targetMethod, {
    apply: function (target, thisArg, args) {
      // record the current date/time this function was called
      const startTime = Date.now();

      // Log the method entry with its arguments
      logger.debug(
        `${className}->${methodName}(${JSON.stringify(args)}) method called.`,
      );

      // Execute the original method and get the result
      const result = target.apply(thisArg, args);

      // record the date/time this method completed
      const endTime = Date.now();

      if (result instanceof Promise) {
        // Create an Async function to log the promise result
        const logresultAsync = async () => {
          const asyncResult = await result;

          // Log the result from the Promise
          logger.debug(
            `${className}->${methodName} method returned value ${JSON.stringify(
              asyncResult,
            )}. Execution Time: ${endTime - startTime} ms.`,
          );
        };

        logresultAsync();
      } else {
        // Log the method completion with the result
        logger.debug(
          `${className}->${methodName} method returned value ${JSON.stringify(
            result.then,
          )}. Execution Time: ${endTime - startTime} ms.`,
        );
      }

      return result;
    },
  });
};
