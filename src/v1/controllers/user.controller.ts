import { NewUser } from "@/db/schemas/user";
import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";

export const createUser = async (
  req: Request<{}, {}, NewUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: NewUser = req.body;
    if (!userData.email || !userData.password || !userData.name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await userService.findUserByEmail(userData.email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const user = await userService.createRegularUser(userData);
    return res.status(201).json(user[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await userService.findUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await userService.findUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let updatedUser;
    if (updates.name) {
      updatedUser = await userService.updateUserName(id, updates.name);
    }
    if (updates.email) {
      const existingUser = await userService.findUserByEmail(updates.email);
      if (existingUser && existingUser.id !== id) {
        return res.status(409).json({ error: "Email already exists" });
      }
      updatedUser = await userService.updateUserEmail(id, updates.email);
    }
    if (updates.password) {
      updatedUser = await userService.updateUserPassword(id, updates.password);
    }
    if (updates.status) {
      updatedUser = await userService.updateUserStatus(id, updates.status);
    }

    return res.status(200).json(updatedUser?.[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { permanent } = req.query;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await userService.findUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let deletedUser;
    if (permanent === "true") {
      deletedUser = await userService.permanentlyDeleteUser(id);
    } else {
      deletedUser = await userService.softDeleteUser(id);
    }

    return res.status(200).json(deletedUser[0]);
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query = "", type = "name", page = "1", limit = "10" } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    let users;
    if (type === "email") {
      users = await userService.searchUsersByEmail(
        query as string,
        pageNum,
        limitNum
      );
    } else {
      users = await userService.searchUsersByName(
        query as string,
        pageNum,
        limitNum
      );
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
