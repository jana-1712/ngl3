import { AppError } from "../../lib/error/err.js"

 export const userNotExist= new AppError('User not found',404)
  export const userVerified= new AppError('User  found',400)
   export const userExist =new AppError('User already exists',409)
 export const userNotVerified =new AppError('User Not Verified',403)
 export const otpExpired =new AppError('OTP not expired',404)
 export const invalidCode= new AppError('Invalid code',400)

 export const invalidPass=new AppError('Password Not Verified',403)