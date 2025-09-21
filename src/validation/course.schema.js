import Joi from 'joi';

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
    flow: Joi.array().items(Joi.string()).optional(),
    submissions: Joi.array().items(submissionSchema).optional(),
    hidden: Joi.boolean().optional(),
});

export const courseSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().optional(),
    startDate: Joi.date().required(),
    group: Joi.string().length(24).hex().optional(),
    links: Joi.array().items(linkSchema).optional(),
    files: Joi.array().items(Joi.string()).optional(),
    lessons: Joi.array().items(lessonSchema).optional(),
    hidden: Joi.boolean().optional(),
});
