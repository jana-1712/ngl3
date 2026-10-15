
import fs from 'node:fs';
import * as userRepo from '../repo/user.repo.js';
import { userNotExist } from '../../../lib/error/err.js';

export const uploadProfilePic = async (userId, file) => {
    const user = await userRepo.findUserById(userId);

    if (!user) {
        throw userNotExist;
    }

    if (user.profilePicPath) {
        fs.unlinkSync(user.profilePicPath);
    }

    await userRepo.updateUserByEmail(user.email, {
        profilePicPath: file.path
    });
};
