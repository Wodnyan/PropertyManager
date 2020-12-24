import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const checkToken = (req: Request, _: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  try {
    if (token) {
      // Bearer <token>
      token = token.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWT_SECRET!);
      console.log(verified);
      next();
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      // Check refresh token.
      const refreshToken = req.cookies.refresh_token;
      const verified = jwt.verify(refreshToken, process.env.JWT_SECRET!);
      req.refreshToken = refreshToken;
      return next();
    }
    next(error);
  }
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Can't found path - ${req.url}`);
  res.status(404);
  next(error);
};

export const defaultErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  return res.json({
    message: error.message,
    code: statusCode,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    errors: error.errors,
  });
};
