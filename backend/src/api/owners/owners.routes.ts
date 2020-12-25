import { Router } from "express";
import prisma from "../../db";
import Joi from "joi";

const schema = Joi.object({
  userId: Joi.number().required(),
});

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const validated = await schema.validateAsync(
      { userId },
      {
        abortEarly: false,
      }
    );
    const owner = await prisma.owner.create({
      data: {
        user: {
          connect: {
            id: validated.userId,
          },
        },
      },
    });
    res.json({
      owner,
    });
  } catch (error) {
    const errors = error.details?.map((error: any) => error.message);
    error.errors = errors;
    next(error);
  }
});

export default router;
