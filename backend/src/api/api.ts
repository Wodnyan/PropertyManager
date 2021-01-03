import { Router } from "express";
import users from "./users/users.routes";
import properties from "./properties/properties.routes";
import tenants from "./tenants/tenants.routes";
import owners from "./owners/owners.routes";
import invites from "./invites/invites.routes";

const router = Router();

router.use("/users", users);
router.use("/properties", properties);
router.use("/tenants", tenants);
router.use("/owners", owners);
router.use("/invites", invites);

router.get("/", (req, res) => {
  res.json({
    message: "Version 1 of the property management API",
  });
});

export default router;
