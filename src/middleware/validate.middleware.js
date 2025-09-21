import { NextFunction, Request, Response } from 'express';
export default function validate(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            const err = new Error(error.message);
            err.status = 400;
            return next(err);
        }
        req.body = value;
        return next();
    };
}
