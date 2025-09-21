import Joi from "joi";

export const groupSchema = Joi.object({
    name: Joi.string().required(),
    courses: Joi.array().items(Joi.string().length(24).hex()).default([]),
    students: Joi.array().items(Joi.string().length(24).hex()).default([]),
    createdDate: Joi.date().default(() => new Date()),
});
