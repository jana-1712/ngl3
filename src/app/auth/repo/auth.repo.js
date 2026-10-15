import{User} from '../../user/model/user.model.js   ';

 export async function checkUserExistsByEmail(email){
    return User.findOne({ email });
}
export async function createUser(userData){
    return await User.create(userData);
}






