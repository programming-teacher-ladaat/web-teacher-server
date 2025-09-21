import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import groupRouter from "./routes/group.route.js";
import swaggerRouter from "./routes/swagger.route.js";
import { NODE_ENV } from "./config/env.js";
import createSwaggerMiddleware from "./middleware/swagger.middleware.js";
import { notFound, errorHandler } from './middleware/errors.middleware.js';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/groups", groupRouter);

// swagger description endpoint (minimal static OpenAPI JSON)
// Only expose the swagger JSON during development or test to avoid leaking in production
if (NODE_ENV !== "production") {
    // machine-readable raw JSON (e.g. /swagger.json)
    app.use("/", swaggerRouter);

    // interactive Swagger UI at /swagger
    const swaggerMiddleware = createSwaggerMiddleware();
    app.use("/swagger", swaggerMiddleware);
}

// basic health
app.get("/health", (req, res) => res.json({ ok: true }));

// 404 handler
app.use(notFound);

// error handler (must be the last middleware)
app.use(errorHandler);

export default app;
