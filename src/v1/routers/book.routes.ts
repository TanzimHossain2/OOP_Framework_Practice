import { Router } from 'express';
import {
	createBook,
	getBook,
	updateBook,
	deleteBook,
	getBooks,
	searchBooks,
	updateBookStatus,
} from '../controllers/book.controller';

const bookRouter = Router();

// Create new book
bookRouter.post('/', (req, res, next) => {
	createBook(req, res, next);
});

// Get book by ID
bookRouter.get('/:id', (req, res, next) => {
	getBook(req, res, next);
});

// Update book
bookRouter.patch('/:id', (req, res, next) => {
	updateBook(req, res, next);
});

// Delete book
bookRouter.delete('/:id', (req, res, next) => {
	deleteBook(req, res, next);
});

// Get books with filters
bookRouter.get('/', (req, res, next) => {
	getBooks(req, res, next);
});

// Search books by title
bookRouter.get('/search', (req, res, next) => {
	searchBooks(req, res, next);
});

// Update book status
bookRouter.patch('/:id/status', (req, res, next) => {
	updateBookStatus(req, res, next);
});

export default bookRouter;
