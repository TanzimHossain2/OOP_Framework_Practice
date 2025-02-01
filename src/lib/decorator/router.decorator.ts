import { type RequestHandler } from 'express';
import { ROUTE_KEY } from './decorator.keys';

export type HTTPMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type RouterDefinition = {
  method: HTTPMethod; // HTTP method
  path: string;
  middlewares: RequestHandler[];
  methodName: string; // Method name within our class responsible for this route
};

export const Route = (
  method: HTTPMethod,
  path: string,
  middlewares: RequestHandler[] = []
) => {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const routes: RouterDefinition[] =
      Reflect.getMetadata(ROUTE_KEY, target) || [];

    // Add the route to our array of routes
    routes.push({
      method,
      path,
      middlewares,
      methodName: propertyKey.toString(),
    });

    // add last routes to the target
    Reflect.defineMetadata(ROUTE_KEY, routes, target);
    return descriptor;
  };
};

export const Get = (path: string, middlewares: RequestHandler[] = []) => {
  return Route('get', path, middlewares);
};

export const Post = (path: string, middlewares: RequestHandler[] = []) => {
  return Route('post', path, middlewares);
};

export const Put = (path: string, middlewares: RequestHandler[] = []) => {
  return Route('put', path, middlewares);
};

export const Delete = (path: string, middlewares: RequestHandler[] = []) => {
  return Route('delete', path, middlewares);
};

export const Patch = (path: string, middlewares: RequestHandler[] = []) => {
  return Route('patch', path, middlewares);
};

