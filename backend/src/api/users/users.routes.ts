import { Router } from "express";
import prisma from "../../db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Joi from "joi";
import { createAccessToken, createRefreshToken } from "../../lib/jwt";

dotenv.config();

const registerSchema = Joi.object({
  // TODO: Make a min and max length for these.
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName: first_name,
      lastName: last_name,
    } = req.body;
    const validated = await registerSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        created_at: new Date(),
        password: hashedPassword,
        email,
        first_name,
        last_name,
      },
    });
    const refreshToken = createRefreshToken(user.id);
    const accessToken = createAccessToken(user.id);
    res.status(201);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
    });
    return res.json({
      accessToken,
      user,
    });
  } catch (error) {
    const errors = error.details?.map((error: any) => error.message);
    error.errors = errors;
    error.message =
      error.code === "P2002" ? "Email is already in use" : error.message;
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(404);
      return res.json({
        message: "No user found",
      });
    }
    const correctPw = await bcrypt.compare(req.body.password, user?.password!);
    if (!correctPw) {
      res.status(400);
      return res.json({
        message: "Incorrect password",
      });
    }
    const refreshToken = createRefreshToken(user.id);
    const accessToken = createAccessToken(user.id);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
    });
    return res.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.last_name,
        lastName: user.first_name,
      },
    });
  } catch (error) {
    const errors = error.details?.map((error: any) => error.message);
    error.errors = errors;
    next(error);
  }
});

export default router;
