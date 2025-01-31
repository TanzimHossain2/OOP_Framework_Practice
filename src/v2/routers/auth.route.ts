import { dbClient } from '@/db/connect';
import { UsersTable } from '@/db/schemas';
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { UserRepository } from '../Repository/user.repo';
import { UserService } from '../services/user.service';

const authRouter = Router();

authRouter.get('/login', (req, res, next) => {
  const controller = new AuthController(
    new UserService(new UserRepository(dbClient, UsersTable))
  );
  controller.login(req, res, next);
});

authRouter.patch('/change-password/:id', (req, res, next) => {
  const controller = new AuthController(
    new UserService(new UserRepository(dbClient, UsersTable))
  );
  controller.changePassword(req, res, next);
});

export default authRouter;
