import express from "express";
import authRouter from "./routers/auth.routes";
import bookRouter from "./routers/book.routes";
import genreRouter from "./routers/genre.routes";
import publisherRouter from "./routers/publishers";
import userRouter from "./routers/user.routes";

const app = express();

// Middleware
app.use(express.json());

// Register routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/publishers", publisherRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

app.use("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
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
    res.status(500).json({ message: "Something went wrong!" });
  }
);

export default app;

