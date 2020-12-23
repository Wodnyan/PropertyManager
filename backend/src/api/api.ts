import { Router } from "express";
import users from "./users/users.routes";

const router = Router();

router.use("/users", users);

router.get("/", (req, res) => {
  res.json({
    message: "Version 1 of the property management API",
  });
});

export default router;
