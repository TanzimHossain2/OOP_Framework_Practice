import { dbClient } from '@/db/connect';
import { UsersTable } from '@/db/schemas';
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../Repository/user.repo';
import { UserService } from '../services/user.service';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  const controller = new UserController(
    new UserService(new UserRepository(dbClient, UsersTable))
  );
  controller.findAll(req, res);
});
userRouter.get('/:id', (req, res) => {
  const controller = new UserController(
    new UserService(new UserRepository(dbClient, UsersTable))
  );
  controller.findById(req, res);
});
userRouter.get('/search', (req, res) => {
  const controller = new UserController(
    new UserService(new UserRepository(dbClient, UsersTable))
  );
  controller.search(req, res);
});
userRouter.post('/', (req, res) => {
  const controller = new UserController(
    new UserService(new UserRepository(dbClient, UsersTable))
  );
  controller.create(req, res);
});
userRouter.put('/:id', (req, res) => {
  const controller = new UserController(
    new UserService(new UserRepository(dbClient, UsersTable))
  );
  controller.update(req, res);
});
userRouter.delete('/:id', (req, res) => {
  const controller = new UserController(
    new UserService(new UserRepository(dbClient, UsersTable))
  );
  controller.delete(req, res);
});

export default userRouter;
