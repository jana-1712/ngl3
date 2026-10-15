import { toMs } from  "../../../pkg/utils/time.js";
import * as authService from '../service/auth.service.js';
export async function register(req, res, next) {
    try {
        const createdUser = await authService.register(req.body);
        res.status(201).json({
            message: 'User registered successfully',
            data: createdUser,
            success: true
        });
    } catch (error) {
        next(error);
    }
}
export async function verifyAccount(req, res, next) {
    try {
        const{ email, code } = req.body;
    const updatedUser =  await authService.verifyAccount(email, code);
      res.status(200).json({
          message: 'Account verified successfully',
          data: updatedUser,
          success: true
      });
    } catch (error) {
        next(error);
    }
}
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const token = await authService.login(email, password);
res.cookie('access-token',token,{
  httpOnly:true,
  maxAge: toMs(1,hours)

});
        res.json({
            message: 'User Login Successfully',
            success: true,
            token
        });

    } catch (error) {
        next(error);
    }
}
export async function sendOtp(req, res, next) {
    try{
        const{email}=res.body;
     await   authService.sendOtp(email);
     res.json ({message:'new otp check your email', success:'true'}
);
    }
    catch(err){
    next(err) ;   }
}
export async function resetPassword(req,res,next){
try{
const {email,code,newPassword}=req.body
await authService.resetPassword(email,code,newPassword);
res.sendStatus(204)
}
catch(err){
    next(err)
}
}
export async function loginWithGoogle(req, res, next) {
    try {
        const token = await authService.loginWithCGoogle(req.body.idToken);

        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: toMs(1, 'hours'),
        });

        res.json({
            message: "user login successfully",
            success: true
        });

    } catch (error) {
        next(error);
    }
}