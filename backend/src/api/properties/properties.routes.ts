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

const joinSchema = Joi.object({
  propertyId: Joi.number().required(),
  code: Joi.string().required(),
});

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

router.get("/:id/tenants", checkToken, async (req, res, next) => {
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

router.delete("/:id", checkToken, async (req, res, next) => {
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

router.patch("/:id", checkToken, async (req, res, next) => {
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

router.post("/:propertyId/join", checkToken, async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { code, userId } = req.body;
    const validate = await joinSchema.validateAsync(
      { code, propertyId },
      {
        abortEarly: false,
      }
    );
    const [invite] = await prisma.invite.findMany({
      where: {
        property: {
          id: validate.propertyId,
        },
        code: validate.code,
      },
      include: {
        property: true,
      },
    });
    if (!Boolean(invite)) {
      const error = new Error("Bad Request");
      res.status(400);
      return next(error);
    }
    const tenant = await prisma.tenant.create({
      data: {
        created_at: new Date(),
        landlord: {
          connect: {
            id: invite.property.owner_id,
          },
        },
        property: {
          connect: {
            id: invite.property.id,
          },
        },
        user: {
          connect: {
            id: Number(userId),
          },
        },
      },
    });
    res.status(201).json({
      tenant,
    });
    res.json({
      invite,
    });
  } catch (error) {
    const errors = error.details?.map((error: any) => error.message);
    error.errors = errors;
    if (error.errors) res.status(400);
    next(error);
  }
});

router.post("/", checkToken, async (req, res, next) => {
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
