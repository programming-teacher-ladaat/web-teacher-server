import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

// Middleware: require valid JWT, attach user info to req.user
export function auth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        const err = new Error("Missing or invalid Authorization header");
        err.status = 401;
        return next(err);
    }
    const [, token] = authorization.split(" ");
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        err.status = 401;
        err.message = "Invalid or expired token";
        next(err);
    }
}

// Middleware: require user to be admin
export function authAdmin(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        const err = new Error("Admin access required");
        err.status = 403;
        return next(err);
    }
    next();
}
