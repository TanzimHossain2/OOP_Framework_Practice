import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  searchUsers,
  updateUser,
} from "../controllers/user.controller";

const userRouter = Router();

// Create new user
userRouter.post("/", (req, res, next) => {
  createUser(req, res, next);
});

// Get user by ID
userRouter.get("/:id", (req, res, next) => {
  getUser(req, res, next);
});

// Update user
userRouter.patch("/:id", (req, res, next) => {
  updateUser(req, res, next);
});

// Delete user (supports ?permanent=true query param)
userRouter.delete("/:id", (req, res, next) => {
  deleteUser(req, res, next);
});

// Search users (supports ?type=email|name&page=1&limit=10)
userRouter.get("/", (req, res, next) => {
  searchUsers(req, res, next);
});

export default userRouter;
