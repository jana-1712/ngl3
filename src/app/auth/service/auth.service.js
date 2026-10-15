import { sendEmail } from "../../../lib/email/nodemailer.js";
import * as authRepo from '../repo/auth.repo.js';
import * as otpRepo from '../repo/otp.repo.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import * as time from '../../../pkg/utils/time.js';
import {invalidCode, otpExpired, userNotExist, userVerified} from '../error.js'
import { generateOtp } from '../../../lib/utils/otp.js';
import { generateToken } from '../../../lib/utils/token.js';
import { comparePassword, hashedPassword } from '../../../lib/utils/hash.js';
import { AppError } from '../../../lib/error/err.js';
import { mailjetProvider } from "../../../lib/email/init.js";

export async function register(userData) {

    const userExists = await authRepo.checkUserExistsByEmail(userData.email);

    if (userExists) {
        throw userExist;
    }

    userData.password = hashedPassword(userData.password);
    const createdUser = await authRepo.createUser(userData);

const code =generateOtp();

    await otpRepo.createOtp({
        code: otp,
        email: userData.email,
        expiresAt: new Date(Date.now() +toMs(2,minutes))
    });
MailjetProvider.sendEmail(userData.email, 'Your OTP is: ' + otp, 'OTP Verification');
    return createdUser;
}
export async function verifyAccount(email, code) {
    const user = await authRepo.checkUserExistsByEmail(email, );
if(!user) {throw userNotExitse;}
if(user.isVerified===true) {throw userVerified;}
    const otp = await otpRepo.findOtpByEmail(email);
    if (!otp) {throw otpExpired;}   
if (otp.code !== code) {throw invalidCode;}
const updatedUser = await userRepo.updateUserByEmail(email, { isVerified: true });
await otpRepo.deleteOtpByEmail(email);
return updatedUser;
}
export async function login(email,password){
    const user=await authRepo.checkUserExistsByEmail(email)
    if (!user)throw userNotExist;
    if(user.isVerified===false)throw userNotVerified;
 const match =await comparePassword(password,user['password'])
 if(!match) throw invalidPass; 
return generateToken({id : user._id, name: user.name} ) ;
return token;
}
export async function sendOtp(email){
    const user= await authRepo.checkUserExistsByEmail(email);
    if(!user)throw userNotExist;
    const code=generateOtp();
    await otpRepo.createOtp({
        code:code,
        email:email,
        expiresAt:Date.now()+ time.toMs(3,minutes)
    });
  await MailjetProvider.sendEmail(email,'new otp', `<p>your new otp is ${code}</p>`)


}
export async function resetPassword(email,code,newPassword) {
    const otp= await otpRepo.findOtpByEmail(email);
    if(!otp)throw otpExpired;
    if(otp.code!==code)throw invalidCode;
    const hashedPassword=await hashedPassword(newPassword);
    await userRepo.updateUserByEmail(email,{password:hashedPassword});
    await otpRepo.deleteOtpByEmail(email)
    
}
export async function loginWithGoogle(idToken) {
    // 1. verify idToken >> 
    const payload = await verifyGoogleToken(idToken);

    // 2. check user exists
    const user = await authRepository.checkUserExistByEmail(payload.email);

    // 3. if exists >> generate token
    if (user) {
        return generateToken({
            id: user._id,
            email: user.email,
        });
    }

    // 4. if not exist create user >> generate Token
    const createdUser = await authRepository.createUser({
        name: payload.name,
        email: payload.email,
        provider: 'google',
        isVerified: true,
    });

    return generateToken({
        id: createdUser._id,
        email: createdUser.email,
    });
}