import Joi from 'joi';

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).optional(),
    role: Joi.string().valid('student', 'admin').optional(),
    courses: Joi.array().items(Joi.string().length(24).hex()).optional(),
});
