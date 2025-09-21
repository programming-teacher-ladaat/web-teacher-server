import Joi from 'joi';

export const groupSchema = Joi.object({
    name: Joi.string().required(),
    courses: Joi.array().items(Joi.string().length(24).hex()).optional(),
    students: Joi.array().items(Joi.string().length(24).hex()).optional(),
    createdDate: Joi.date().optional(),
});
