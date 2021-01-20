import { IFunctionalResponse } from '../interfaces/IFunctional.response';
import { IUserInterface, IUserLogin } from '../interfaces/user.interface';
import User from '../models/user.models';
let userInternalResponse: IFunctionalResponse = {
    errors: null,
    data: null,
    status: false,
    msg: ''
};
export class UserHelper {
    static addUser(userData: IUserInterface, callback: any) {
        let _userObject = new User(userData);
        _userObject.save((err) => {
            // console.log('\n\n\n error', err, err)
            if (err) {
                userInternalResponse.errors = err;
                userInternalResponse.status = false;
                userInternalResponse.data = [];
            } else {
                userInternalResponse.status = true;
                userInternalResponse.errors = null;
                userInternalResponse.data = [_userObject];
            }
            callback(userInternalResponse);
        });
    }

    static checkUserLogin(loginData: IUserLogin, callback: any) {
        try {
            User.findOne({email: loginData?.email}, (userFindError, userDetails) => {
                if (userFindError) {
                    userInternalResponse.errors = userFindError;
                    userInternalResponse.status = false;
                    userInternalResponse.data = [];
                } else {
                    if (userDetails) {
                        if (!userDetails.comparePassword(loginData?.password)) {
                            userInternalResponse.errors = 'Password does not match';
                            userInternalResponse.status = false;
                            userInternalResponse.data = [];
                        } else {
                            userInternalResponse.errors = null;
                            userInternalResponse.status = true;
                            delete userDetails?.password;
                            userInternalResponse.data = userDetails;
                        }
                    } else {
                        userInternalResponse.errors = 'No records found for provided data';
                        userInternalResponse.status = false;
                        userInternalResponse.data = [];
                    }
                }
                callback(userInternalResponse);
            });   
        } catch (error) {
            throw error;
        }
    }

    static getUserDetails(userId: string = null, callback: any) {
        if (userId) {
            User.findById(userId, {password: 0}, (userFindError, userDetails)=> { 
                if (!userFindError) {
                    userInternalResponse.errors = null;
                    userInternalResponse.status = true;
                    userInternalResponse.data = [userDetails];
                } else {
                    userInternalResponse.errors = userFindError;
                    userInternalResponse.status = false;
                    userInternalResponse.data = [];
                }
                callback(userInternalResponse);
            });
        } else {
            User.find({}, {password: 0}, (userFindError, userDetails)=> {
                if (!userFindError) {
                    userInternalResponse.errors = null;
                    userInternalResponse.status = true;
                    userInternalResponse.data = userDetails;
                } else {
                    userInternalResponse.errors = userFindError;
                    userInternalResponse.status = false;
                    userInternalResponse.data = [];
                }
                callback(userInternalResponse);
            });
        }
    }

    static deleteUser(userId: string, callback) {
        User.findByIdAndUpdate(userId, {isActive: false}, (findAndUpdateError, updatedData) => {
            if (!findAndUpdateError) {
                userInternalResponse.errors = null;
                userInternalResponse.status = true;
                userInternalResponse.data = [];
                userInternalResponse.msg = 'User is deleted';
            } else {
                userInternalResponse.errors = findAndUpdateError;
                userInternalResponse.status = false;
                userInternalResponse.data = [];
            }
            callback(userInternalResponse);
        });
    }
}