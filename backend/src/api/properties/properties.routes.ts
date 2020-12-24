import { Router } from "express";
import prisma from "../../db";
import Joi from "joi";
import { checkToken } from "../../lib/middlewares/";

const schema = Joi.object({
  ownerId: Joi.number().required(),
  name: Joi.string().required(),
  address: Joi.string(),
  long: Joi.number(),
  lat: Joi.number(),
}).and("long", "lat");

const router = Router();

router.get("/", async (req, res, next) => {
  const { tenant } = req.query;
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
    const properties = await prisma.property.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({
      properties,
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
router.patch("/:id", (req, res, next) => {});
router.post("/", async (req, res, next) => {
  try {
    const validated = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    const property = await prisma.property.create({
      data: {
        name: validated.name,
        address: validated.address,
        latitude: validated.lat,
        longitude: validated.long,
        createdAt: new Date(),
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
