
import fs from 'node:fs';
import * as userRepo from '../repo/user.repo.js';
import { userNotExist } from '../../../lib/error/err.js';
import * as userService from '../service/user.service.js'

export const uploadProfilePic = async (req, res, next) => {
    try {
   await  userService.uploadProfilePic(req.user.id,req.file)

        res.json({
            message: 'upload profile successfully.',
            success: true
        });
    } catch (error) {
        next(error);
    }
};
