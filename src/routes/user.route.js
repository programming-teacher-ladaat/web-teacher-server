import express from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser, login } from "../controllers/user.controller.js";
import validate from "../middleware/validate.middleware.js";
import { userSchema, loginSchema } from "../validation/user.schema.js";

const router = express.Router();

router.post("/", validate(userSchema), createUser);
router.post("/login", validate(loginSchema), login);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", validate(userSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;
