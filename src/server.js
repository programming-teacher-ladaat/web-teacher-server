import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO_URI || process.env.MONGO || 'mongodb://localhost:27017/web-teacher';

mongoose
    .connect(MONGO)
    .then(() => {
        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Mongo connection error', err);
        process.exit(1);
    });
