import { UsersType } from '../2-bll-users/UsersReducer';
import { instanse } from './../../../store-1-main/3-dal-main/api';

export const apiUsers = {
    getAllUsers() {
        return instanse.get(`users`)
            .then(res => res.data)
    },
    loginAuth(username:string, password:string){
        return instanse.post(`auth/login`, {username, password})
        .then(res => res.data)
    },
    signUp(user: UsersType){
        return instanse.post(`users`, {user})
        .then(res => res.data)
    },
    getSingleUser(idUser:number){
        return instanse.get(`users/${idUser}`)
        .then(res => res.data)
    },
    updateUserInfo(idUser: number, user:UsersType){
        return instanse.patch(`users/${idUser}`, {user})
        .then(res => res.data)
    },
    deleteProfile(idUser: number){
        return instanse.delete(`users/${idUser}`)
        .then(res => res.data)
    }
}