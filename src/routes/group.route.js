import express from "express";
import { createGroup, getGroups, getGroup, updateGroup, deleteGroup } from "../controllers/group.controller.js";
import validate from "../middleware/validate.middleware.js";
import { groupSchema } from "../validation/group.schema.js";

const router = express.Router();

router.post("/", validate(groupSchema), createGroup);
router.get("/", getGroups);
router.get("/:id", getGroup);
router.put("/:id", validate(groupSchema), updateGroup);
router.delete("/:id", deleteGroup);

export default router;
