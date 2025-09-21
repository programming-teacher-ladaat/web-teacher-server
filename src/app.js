import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import groupRouter from "./routes/group.route.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/groups", groupRouter);

// basic health
app.get("/health", (req, res) => res.json({ ok: true }));

export default app;
