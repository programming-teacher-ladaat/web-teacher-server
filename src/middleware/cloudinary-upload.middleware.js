import multer from 'multer';
import cloudinary from '../config/cloudinary.config.js';

// Multer setup: store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Middleware: upload files to Cloudinary and attach URLs to req.filesUrls
export function cloudinaryUpload(fieldName = 'files', maxCount = 10, folder = 'courses', accept) {
    return [
        upload.array(fieldName, maxCount),
        async (req, res, next) => {
            if (!req.files || req.files.length === 0) {
                req.filesUrls = [];
                return next();
            }
            // Accept: string ("image/*"), array (["image/png", ...]), or undefined (allow all)
            if (accept) {
                const allowed = Array.isArray(accept) ? accept : [accept];
                const rejected = req.files.filter(f => !allowed.some(type =>
                    type.endsWith('/*') ? f.mimetype.startsWith(type.slice(0, -1)) : f.mimetype === type
                ));
                if (rejected.length > 0) {
                    const err = new Error('Some files have disallowed type: ' + rejected.map(f => f.originalname + ' (' + f.mimetype + ')').join(', '));
                    err.status = 400;
                    return next(err);
                }
            }
            try {
                const urls = [];
                for (const file of req.files) {
                    const url = await new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto', folder }, (err, result) => {
                            if (err) return reject(err);
                            resolve(result.secure_url);
                        });
                        stream.end(file.buffer);
                    });
                    urls.push(url);
                }
                req.filesUrls = urls;
                next();
            } catch (err) {
                next(err);
            }
        }
    ];
}

export default upload;
