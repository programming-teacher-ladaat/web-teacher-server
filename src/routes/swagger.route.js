import { Router } from "express";
import getSwagger from "../controllers/swagger.controller.js";

const router = Router();

// GET /swagger.json - return OpenAPI JSON (machine-readable)
router.get("/swagger.json", getSwagger);

export default router;
