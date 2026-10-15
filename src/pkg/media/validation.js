import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";

import { AppError } from '../../lib/error/err.js';

export const allowedFields = {
    images: ['image/png', 'image/jpeg'],
    files: ['application/pdf', 'application/msword'],
    videos: ['video/mp4'],
    audios: ['audio/mp3']
};


export const fileValidation =(allowedTypes=allowedFields.images)=> async (req, res, next) => {
  try {
    // get the file path
    const filePath = req.file.path;
    // read the file and return buffer
    const buffer = fs.readFileSync(filePath);
    // get the file type
    const type = await fileTypeFromBuffer(buffer);
    // validate
    if (!type || !allowedTypes.includes(type.mime))
fs.unlinkSync(filePath)
        return next(new Error("Invalid file type"));

    return next();
  } catch (error) {
    return next(new AppError("Internal server error",400));
  }
};