import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export async function createUser(req, res, next) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

export async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id).populate("courses");
        if (!user) {
            const err = new Error("Not Found");
            err.status = 404;
            throw err;
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function updateUser(req, res, next) {
    try {
        // If password is being updated, use document.save() so pre-save hooks run
        if (req.body && Object.prototype.hasOwnProperty.call(req.body, "password")) {
            const user = await User.findById(req.params.id);
            if (!user) {
                const err = new Error("Not Found");
                err.status = 404;
                throw err;
            }
            // assign provided fields to the user document
            Object.assign(user, req.body);
            const saved = await user.save();
            return res.json(saved);
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            const err = new Error("Not Found");
            err.status = 404;
            throw err;
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function deleteUser(req, res, next) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

// login handler: accepts { email, password } and returns a JWT with { role, id }
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const err = new Error("Email and password are required");
            err.status = 400;
            throw err;
        }

        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error("Invalid credentials");
            err.status = 401;
            throw err;
        }

        const match = await user.comparePassword(password);
        if (!match) {
            const err = new Error("Invalid credentials");
            err.status = 401;
            throw err;
        }

        const payload = { role: user.role, id: user._id.toString() };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token });
    } catch (err) {
        next(err);
    }
}
