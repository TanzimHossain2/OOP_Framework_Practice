import { Router } from 'express';
import {
	createPublisher,
	getPublisher,
	updatePublisher,
	deletePublisher,
	getPublishers,
	searchPublishers,
} from '../controllers/publisher.controller';

const publisherRouter = Router();

// Create new publisher
publisherRouter.post('/', (req, res, next) => {
	createPublisher(req, res, next);
});

// Get publisher by ID
publisherRouter.get('/:id', (req, res, next) => {
	getPublisher(req, res, next);
});

// Update publisher
publisherRouter.put('/:id', (req, res, next) => {
	updatePublisher(req, res, next);
});

// Delete publisher
publisherRouter.delete('/:id', (req, res, next) => {
	deletePublisher(req, res, next);
});

// Get publishers with filters
publisherRouter.get('/', (req, res, next) => {
	getPublishers(req, res, next);
});

// Search publishers by name
publisherRouter.get('/search', (req, res, next) => {
	searchPublishers(req as any, res, next);
});

export default publisherRouter;
