import Joi from "joi";

export const linkSchema = Joi.object({
    name: Joi.string().optional(),
    url: Joi.string().uri().required(),
});

export const submissionSchema = Joi.object({
    filename: Joi.string().optional(),
    originalName: Joi.string().optional(),
    uploadedAt: Joi.date().optional(),
});

export const lessonSchema = Joi.object({
    topic: Joi.string().optional(),
    date: Joi.date().optional(),
    flow: Joi.array().items(Joi.string()).default([]),
    submissions: Joi.array().items(submissionSchema).default([]),
    hidden: Joi.boolean().default(false),
});

export const courseSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().optional(),
    startDate: Joi.date().required(),
    group: Joi.string().length(24).hex().optional(),
    links: Joi.array().items(linkSchema).default([]),
    files: Joi.array().items(Joi.string()).default([]),
    lessons: Joi.array().items(lessonSchema).default([]),
    hidden: Joi.boolean().default(true),
});
