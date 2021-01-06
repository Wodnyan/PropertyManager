import { Router } from "express";
import prisma from "../../db";
import Joi from "joi";
import { checkToken } from "../../lib/middlewares";

const router = Router();

const schema = Joi.object({
  landlordId: Joi.number().required(),
  propertyId: Joi.number().required(),
  userId: Joi.number().required(),
});

router.get("/:id", checkToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const tenant = await prisma.tenant.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        user: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        property: true,
        landlord: {
          include: {
            user: {
              select: {
                email: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });
    res.json({
      tenant,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const tenants = await prisma.tenant.findMany({
      include: {
        user: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        property: true,
        landlord: {
          include: {
            user: {
              select: {
                email: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });
    res.json({
      tenants,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", checkToken, async (req, res, next) => {
  try {
    const validated = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    const tenant = await prisma.tenant.create({
      data: {
        created_at: new Date(),
        landlord: {
          connect: {
            id: validated.landlordId,
          },
        },
        property: {
          connect: {
            id: validated.propertyId,
          },
        },
        user: {
          connect: {
            id: validated.userId,
          },
        },
      },
    });
    res.status(201).json({
      tenant,
    });
  } catch (error) {
    const errors = error.details?.map((error: any) => error.message);
    error.errors = errors;
    next(error);
  }
});

export default router;
