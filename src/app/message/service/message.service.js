
import * as userRepo from '../../user/repo/user.repo.js';
import { userNotExist } from '../../auth/error.js';
import * as messageRepo from '../repo/message.repo.js';
import { AppError } from '../../../lib/error/err.js';

export async function sendMessage(content, receiver, sender) {
    const user = await userRepository.findUserById(receiver);

    if (!user) throw userNotExist;

    return await messageRepository.createMessage(content, receiver, sender);
}


export async function getAllMessages(userId) {
    const messages=await messageRepo.getAllMessags(userId);
    if(message.length===0)throw AppError('no message found',404);
return messages;
}
