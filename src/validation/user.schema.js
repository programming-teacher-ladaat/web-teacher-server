import Joi from "joi";

export const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).default("12345678"),
    role: Joi.string().valid("student", "admin").default("student"),
    courses: Joi.array().items(Joi.string().length(24).hex()).default([]),
});

// Login schema for POST /login
export const loginSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
});
