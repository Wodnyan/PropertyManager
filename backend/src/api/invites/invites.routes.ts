import { Router } from "express";
import prisma from "../../db";

const router = Router();

router.post("/", (req, res, next) => {
  const { propertyId } = req.body;
  res.json({
    message: "invites",
  });
});

export default router;
