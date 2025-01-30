import { Router } from "express";
import {
  changePassword,
  login,
  register,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", (req, res, next) => {
  register(req, res, next);
});

authRouter.post("/login", (req, res, next) => {
  login(req, res, next);
});

authRouter.patch("/change-password/:id", (req, res, next) => {
  changePassword(req, res, next);
});

export default authRouter;
