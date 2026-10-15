
import multer, { diskStorage } from 'multer';
import crypto from 'node:crypto'
import { allowedFields } from './validation.js';
function fileUpload (allowedTypes =allowedFields.images) {
    return multer({
        fileFilter: function (req, file, cb) {
          
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new AppError('invalid file format', 400), false);
            }

            cb(null, true);
        },
        storage: diskStorage({
            destination: 'uploads',
            filename: function (req, file, cb) {
                console.log(file);
                cb(null, `${crypto.randomUUID()}-${file.originalname}`);
            }
        })
    });
}

export function uploadSingleFile(fieldName,allowedTypes=allowedFields.images) {
    return fileUpload().single(fieldName);
}

export function uploadFilesArray(fieldName) {
    return fileUpload().array(fieldName);
}

export function uploadFields(fields) {
    return fileUpload().fields(fields);
}