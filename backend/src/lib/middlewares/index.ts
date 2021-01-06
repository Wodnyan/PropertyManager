import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  try {
    if (token) {
      // Bearer <token>
      token = token.split(" ")[1];
      const verified = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("Here");
      next();
    } else {
      const error = new Error("No authentication token was provided");
      res.status(401);
      next(error);
      console.log("Check refreshToken");
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      const refreshToken = req.cookies.refresh_token;
      try {
        const verified = jwt.verify(refreshToken, process.env.JWT_SECRET!);
        res.cookie("refresh_token", refreshToken, { httpOnly: true });
        return next();
      } catch (error) {
        res.status(401);
        return res.json({
          message: "You aren't authorized to view this content",
        });
      }
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
