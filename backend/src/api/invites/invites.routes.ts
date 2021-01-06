import { Router } from "express";
import prisma from "../../db";
import Joi from "joi";
import randomCode from "../../lib/randomCode";
import { checkToken } from "../../lib/middlewares";

const router = Router();

const createSchema = Joi.object({
  propertyId: Joi.number().required(),
});

router.post("/:propertyId/create", checkToken, async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const validate = await createSchema.validateAsync(
      { propertyId },
      {
        abortEarly: false,
      }
    );
    const property = await prisma.property.findUnique({
      where: {
        id: validate.propertyId,
      },
    });
    if (!property) {
      const error = new Error(
        `No property with the id of ${validate.propertyId} exists`
      );
      res.status(404);
      return next(error);
    }
    const code = randomCode(8);
    const invite = await prisma.invite.create({
      data: {
        code,
        property: {
          connect: {
            id: validate.propertyId,
          },
        },
        created_at: new Date(),
      },
    });
    res.json({
      message: "invites",
      code,
      invite,
    });
  } catch (error) {
    const errors = error.details?.map((error: any) => error.message);
    error.errors = errors;
    if (error.errors) res.status(400);
    next(error);
  }
});

export default router;
