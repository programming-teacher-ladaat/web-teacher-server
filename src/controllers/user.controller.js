import User from '../models/user.model.js';

export async function createUser(req, res, next) {
    try {
        const user = await User.create(req.body);
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
        const user = await User.findById(req.params.id).populate('courses');
        if (!user) {
            const err = new Error('Not Found');
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
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            const err = new Error('Not Found');
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
