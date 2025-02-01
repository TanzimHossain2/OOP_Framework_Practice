import 'reflect-metadata';

import { RequestHandler } from 'express';
import { CONTROLLER_MIDDLEWARE_KEY, MIDDLEWARE_KEY } from './decorator.keys';

export function Use(middleware: RequestHandler | RequestHandler[]) {
  return function (target: any, propertyKey?: string | symbol) {
    const middlewares = Array.isArray(middleware) ? middleware : [middleware];

    // Method Level
    if (propertyKey) {
      const existingMiddlewares =
        Reflect.getMetadata(MIDDLEWARE_KEY, target, propertyKey) || [];

      const combinedMiddlewares = [...existingMiddlewares, ...middlewares];

      Reflect.defineMetadata(
        MIDDLEWARE_KEY,
        combinedMiddlewares,
        target,
        propertyKey
      );

      return;
    }

    // Class Level Middleware
    const existingMiddlewares =
      Reflect.getMetadata(CONTROLLER_MIDDLEWARE_KEY, target) || [];

    const combinedMiddlewares = [...existingMiddlewares, ...middlewares];
    Reflect.defineMetadata(
      CONTROLLER_MIDDLEWARE_KEY,
      combinedMiddlewares,
      target
    );
    return;
  };
}

// export const AuthMiddleware = () => Use(authMiddleware);
// export const AdminMiddleware = () => Use(adminMiddleware);
// export const AuthMiddleware = () =>
//   Use(async (req, res, next) => {
//     console.log('Auth Middleware');
//     next();
// });

