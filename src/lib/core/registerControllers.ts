import { Application, RequestHandler, Router } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import {
  CONTROLLER_KEY,
  CONTROLLER_MIDDLEWARE_KEY,
  MIDDLEWARE_KEY,
  ROUTE_KEY,
} from '../decorator/decorator.keys';
import { RouterDefinition } from '../decorator/router.decorator';

type ControllerMetaData = {
  basePath: string;
  routes: RouterDefinition[];
  middlewares: RequestHandler[];
};

type Constructor = new (...args: any[]) => {};

export function registerControllers(
  app: Application,
  controllers: Constructor[]
) {
  controllers.forEach((Controller) => {
    // resolve dependencies injection here
    const controllerInstance = container.resolve(Controller);

    const controllerMetadata: ControllerMetaData = {
      basePath: Reflect.getMetadata(CONTROLLER_KEY, Controller),
      routes: Reflect.getMetadata(
        ROUTE_KEY,
        Controller.prototype
      ) as RouterDefinition[],
      middlewares:
        Reflect.getMetadata(CONTROLLER_MIDDLEWARE_KEY, Controller) || [],
    };

    if (!controllerMetadata.basePath) {
      throw new Error(
        `[registerControllers]: Controller path is not defined for ${Controller.name}`
      );
    }

    if (!controllerMetadata.routes) {
      throw new Error(
        `[registerControllers]: Routes are not defined for ${Controller.name}`
      );
    }

    // router
    const router = Router();

    //apply controller level middleware
    if (controllerMetadata.middlewares.length > 0) {
      router.use(controllerMetadata.middlewares);
      console.log('Controller middleware applied');
    }

    // handle Individual routes

    controllerMetadata.routes.forEach((route) => {
      //check if the method exists in the controller instance
      if (!(route.methodName in controllerInstance))
        throw new Error(
          `[registerControllers]: Method ${route.methodName} is not implemented in ${Controller.name}`
        );

      const middlewares =
        Reflect.getMetadata(
          MIDDLEWARE_KEY,
          Controller.prototype,
          route.methodName
        ) || [];

      const handler = (controllerInstance as any)[route.methodName].bind(
        controllerInstance
      );

      // apply method level middleware
      if (middlewares.length > 0) {
        router[route.method](route.path, [...middlewares], handler);
      } else {
        router[route.method](route.path, handler);
      }
    });

    app.use(controllerMetadata.basePath, router);
  });
}

