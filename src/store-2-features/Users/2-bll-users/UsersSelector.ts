import { AppStateType } from "../../../store-1-main/2-bll-main/redux-store"



export const usersSelector=(state: AppStateType)=>{
    return state.users.users
}

export const isAuthSelector=(state: AppStateType)=>{
    return state.users.isAuth
}

export const errorSelector=(state: AppStateType)=>{
    return state.users.error
}

export const singleUserSelector=(state: AppStateType)=>{
    return state.users.singleUser
}

export const isLoadingSelector=(state: AppStateType)=>{
    return state.users.isLoading
}


