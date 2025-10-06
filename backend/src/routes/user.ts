import express, { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";

export const userRoute = express.Router();


const signupSchema = z.object({
  name: z.string().min(2, "Name too short"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signinSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});



userRoute.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = signupSchema.parse(req.body);

    const existingUser = await UserModel.findOne({ username: parsed.username });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    await UserModel.create({
      name: parsed.name,
      username: parsed.username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User successfully signed up" });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRoute.post("/signin", async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = signinSchema.parse(req.body);

    const user = await UserModel.findOne({ username: parsed.username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
        parsed.password,
        user.password ?? ""
    );
if (!isPasswordValid) {
  res.status(401).json({ message: "Invalid credentials" });
  return;
}

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECREAT as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});