
import express from 'express';
import { User } from './model/user.model.js';
import { withCache } from '../../lib/cache/cachewith.js';
import { uploadSingleFile, uploadFilesArray } from '../../pkg/media/multer.js';
import { allowedFields } from '../../pkg/media/validation.js';
import { fileValidation } from '../../pkg/media/validation.js';
import{ guard}from '../../lib/auth/guard.js'
import * as userController from '../user/controller/user.controller.js'
const userRouter = express.Router();

userRouter.post(
    '/upload-profile-pic',
    guard,
    uploadSingleFile('pp'),
    fileValidation(),
userController.uploadProfilePic
);

userRouter.post(
    '/upload-cv',
    uploadSingleFile('cv'),
      fileValidation(allowedFields.files),
    (req, res, next) => {
        console.log(req.file);
        res.json('ok');
    }
);

userRouter.post(
    '/upload-cover-images',
          fileValidation(allowedFields.images),
    uploadFilesArray('cover-images'),
    (req, res, next) => {
        console.log(req.files);
        res.json('ok');
    }
);

export default userRouter;
