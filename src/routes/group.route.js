import express from "express";
import { createGroup, getGroups, getGroup, updateGroup, deleteGroup } from "../controllers/group.controller.js";
import validate from "../middleware/validate.middleware.js";
import { groupSchema } from "../validation/group.schema.js";
import { auth, authAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all group routes with auth and admin
router.use(auth, authAdmin);

router.post("/", validate(groupSchema), createGroup);
router.get("/", getGroups);
router.get("/:id", getGroup);
router.put("/:id", validate(groupSchema), updateGroup);
router.delete("/:id", deleteGroup);

export default router;
