import { Router } from "express";
import prisma from "../../db";
import Joi from "joi";
import { checkToken } from "../../lib/middlewares/";

const schema = Joi.object({
  ownerId: Joi.number().required(),
  name: Joi.string().required(),
  address: Joi.string(),
  longitude: Joi.number(),
  latitude: Joi.number(),
}).and("longitude", "latitude");

const patchSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  longitude: Joi.number(),
  latitude: Joi.number(),
}).and("longitude", "latitude");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const properties = await prisma.property.findMany();
    res.json({
      properties,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const property = await prisma.property.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        owner: {
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
      property,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/tenants", async (req, res, next) => {
  try {
    const property = await prisma.property.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      select: {
        Tenant: true,
      },
    });
    res.json({
      property,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const properties = await prisma.property.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const validated = await patchSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const updated = await prisma.property.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: validated,
    });
    res.json({
      updated,
    });
  } catch (error) {
    const errors = error.details?.map((error: any) => error.message);
    error.errors = errors;
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validated = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    const property = await prisma.property.create({
      data: {
        name: validated.name,
        address: validated.address,
        latitude: validated.latitude,
        longitude: validated.longitude,
        created_at: new Date(),
        owner: {
          connect: {
            id: validated.ownerId,
          },
        },
      },
    });
    res.status(201);
    return res.json({
      property,
    });
  } catch (error) {
    const errors = error.details?.map((error: any) => error.message);
    error.errors = errors;
    next(error);
  }
});

export default router;
