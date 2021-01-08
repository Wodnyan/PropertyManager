import { Router } from "express";
import prisma from "../../db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Joi from "joi";
import { createAccessToken, createRefreshToken } from "../../lib/jwt";
import { checkToken } from "../../lib/middlewares";

dotenv.config();

const registerSchema = Joi.object({
  // TODO: Make a min and max length for these.
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const router = Router();

router.get("/user", checkToken, async (req, res, next) => {
  console.log(req.userId);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.userId),
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        created_at: true,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkToken, async (req, res, next) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    const error = new Error(`Param ${id} is not a number`);
    res.status(400);
    return next(error);
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        created_at: true,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
});

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
