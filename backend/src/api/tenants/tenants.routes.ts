import { Router } from "express";
import prisma from "../../db";

const router = Router();

router.post("/", async (req, res, next) => {
  const tenant = await prisma.tenant.create({
    data: {
      created_at: new Date(),
      landlord: {
        connect: {
          id: req.body.user_id,
        },
      },
      property: {
        connect: {
          id: req.body.propertyId,
        },
      },
    },
  });
});

export default router;
