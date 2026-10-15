import { AppError } from '../../../common/db/error/err.js';
import {OAuth2Client}from 'google-auth-library'

 const client =new OAuth2Client({client_id:process.env.CLIENTOAUTH});
export async function verifyGoogleToken(idToken){
//38470852213-idm3gj71i43dmn9hs6tkvve3b7ar9fcp.apps.googleusercontent.com
try{
   
const ticket=await client.verifyIdToken({idToken:idToken});
return ticket.getPayload();
}
catch(err){
    throw new AppError('invalid google tokemn',403);
}
}