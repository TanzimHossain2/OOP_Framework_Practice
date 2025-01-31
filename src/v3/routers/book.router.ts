import { dbClient } from '@/db/connect';
import { BookTable } from '@/db/schemas';
import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { BookRepository } from '../Repository/book.repo';
import { BookService } from '../services/book.service';

const bookRouter = Router();

bookRouter.get('/', (req, res) => {
  const controller = new BookController(
    new BookService(new BookRepository(dbClient, BookTable))
  );
  controller.findAll(req, res);
});
bookRouter.get('/:id', (req, res) => {
  const controller = new BookController(
    new BookService(new BookRepository(dbClient, BookTable))
  );
  controller.findById(req, res);
});
bookRouter.get('/search', (req, res) => {
  const controller = new BookController(
    new BookService(new BookRepository(dbClient, BookTable))
  );
  controller.search(req, res);
});
bookRouter.post('/', (req, res) => {
  const controller = new BookController(
    new BookService(new BookRepository(dbClient, BookTable))
  );
  controller.create(req, res);
});
bookRouter.put('/:id', (req, res) => {
  const controller = new BookController(
    new BookService(new BookRepository(dbClient, BookTable))
  );
  controller.update(req, res);
});
bookRouter.delete('/:id', (req, res) => {
  const controller = new BookController(
    new BookService(new BookRepository(dbClient, BookTable))
  );
  controller.delete(req, res);
});

export default bookRouter;

