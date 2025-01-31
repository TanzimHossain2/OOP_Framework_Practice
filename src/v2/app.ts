import express from 'express';
import authRouter from './routers/auth.route';
import bookRouter from './routers/book.router';
import userRouter from './routers/user.router';

const app = express();

// Middleware
app.use(express.json());

// Register routes
app.use('/api/v2/auth', authRouter);
app.use('/api/v2/users', userRouter);
app.use('/api/v2/books', bookRouter);

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

export default app;

