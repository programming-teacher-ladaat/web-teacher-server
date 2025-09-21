import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).default("12345678"),
    role: Joi.string().valid("student", "admin").default("student"),
    courses: Joi.array().items(Joi.string().length(24).hex()).default([]),
});
