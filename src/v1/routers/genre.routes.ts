import { Router } from 'express';
import {
	createGenre,
	getGenre,
	updateGenre,
	deleteGenre,
	getGenres,
	searchGenres,
} from '../controllers/genre.controller';
import { changePassword } from '../controllers/auth.controller';

const genreRouter = Router();

// Create new genre
genreRouter.post('/', (req, res, next) => {
	createGenre(req, res, next);
});

// Get genre by ID
genreRouter.get('/:id', (req, res, next) => {
	getGenre(req, res, next);
});

// Update genre
genreRouter.put('/:id', (req, res, next) => {
	updateGenre(req, res, next);
});

// Delete genre
genreRouter.delete('/:id', (req, res, next) => {
	deleteGenre(req, res, next);
});

// Get genres with filters
genreRouter.get('/', (req, res, next) => {
	getGenres(req, res, next);
});

// Search genres by name
genreRouter.get('/search', (req, res, next) => {
	searchGenres(req as any, res, next);
});

genreRouter.post('/reviews/:id', (req, res, next) => {
	changePassword(req, res, next);
});

export default genreRouter;
