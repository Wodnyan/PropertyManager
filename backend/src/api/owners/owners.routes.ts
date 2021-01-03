import { Router } from "express";
import prisma from "../../db";
import Joi from "joi";

const schema = Joi.object({
  userId: Joi.number().required(),
});

const router = Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const owner = await prisma.owner.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    res.json({
      owner,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/tenants", async (req, res, next) => {
  const { id } = req.params;
  try {
    const owner = await prisma.owner.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        Tenant: true,
      },
    });
    res.json({
      owner,
    });
  } catch (error) {
    next(error);
  }
});

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
    res.status(201).json({
      owner,
    });
  } catch (error) {
    const errors = error.details?.map((error: any) => error.message);
    error.errors = errors;
    next(error);
  }
});

export default router;
