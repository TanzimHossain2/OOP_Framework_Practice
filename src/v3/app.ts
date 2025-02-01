import { registerControllers } from '@/lib/core/registerControllers';
import express from 'express';
import 'reflect-metadata';
import { BookController } from './controllers/book.controller';
import { UserController } from './controllers/user.controller';
import authRouter from './routers/auth.route';

export const createApp =  () => {
  const app = express();

  // Middleware
  app.use(express.json());

  registerControllers(app, [UserController, BookController]);

  // Register routes
  app.use('/api/v3/auth', authRouter);

  app.use('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  });

  // Error handling middleware
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  );

  return app;
};

