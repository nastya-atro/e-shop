import { CommonActionsTypes, CommonThunkType } from "../../../store-1-main/2-bll-main/redux-store"
import { apiUsers } from './../3-dal-users/apiUsers';


export type UsersType = {
    id?: number
    email: string
    username: string
    password: string
    name: {
        firstname: string
        lastname: string
    },
    address: {
        city: string
        street: string
        number: number
        zipcode: string
        geolocation: {
            lat: string
            long: string
        }
    },
    phone: string
}

let initialState = {
    users: [] as Array<UsersType>,
    token: null as null | '',
    isAuth: false,
    error: false,
    singleUser: null as null | UsersType,
    isLoading: true
}

export type InitialStateType = typeof initialState

const UsersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'users/SET_ALL_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'users/SET_LOGIN_AUTH':
            return {
                ...state,
                token: action.token,
                isAuth: action.isAuth,
                error: action.error
            }

        case 'users/SIGN_UP':
            return {
                ...state,
                users: [...state.users, action.user],
                isAuth: action.isAuth,
            }
        case 'users/SET_SINGLE_USER':
            return {
                ...state,
                singleUser: action.singleUser

            }
        case 'users/UPDATE_PROFILE_INFO':
            return {
                ...state,
                singleUser: action.user

            }
        case 'users/DELETE_PROFILE':
            return {
                ...state,
                users: state.users.filter(u => u.id !== action.id)

            }
        case 'user/TOOGLE_IS_LOAGING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        default: return state
    }
}

export const actionsUsers = {
    usersRecived: (users: Array<UsersType>) => ({
        type: 'users/SET_ALL_USERS', users
    } as const),
    loginSuccess: (token: null | '', isAuth: boolean, error: boolean) => ({
        type: 'users/SET_LOGIN_AUTH', token, isAuth, error
    } as const),
    signUpSuccess: (user: UsersType, isAuth: boolean) => ({
        type: 'users/SIGN_UP', user, isAuth
    } as const),
    userSelected: (singleUser: UsersType) => ({
        type: 'users/SET_SINGLE_USER', singleUser
    } as const),
    profileInfoUpdated: (user: UsersType) => ({
        type: 'users/UPDATE_PROFILE_INFO', user
    } as const),
    deleteProfile: (id: number) => ({
        type: 'users/DELETE_PROFILE', id
    } as const),
    isLoadingChanged: (isLoading: boolean) => ({
        type: 'user/TOOGLE_IS_LOAGING', isLoading
    } as const),

}

type ActionsTypes = CommonActionsTypes<typeof actionsUsers>
type ThunkType = CommonThunkType<ActionsTypes>


export const getAllUsersThunk = (): ThunkType => {
    return async (dispatch) => {
        let data = await apiUsers.getAllUsers()
        dispatch(actionsUsers.usersRecived(data))
    }
}

export const loginAuthThunk = (userName: string, password: string): ThunkType => {
    return async (dispatch) => {
        let data = await apiUsers.loginAuth(userName, password)
        if (data.status === 'Error') {
            dispatch(actionsUsers.loginSuccess(data, false, true))
        }
        if (data.token) {
            dispatch(actionsUsers.loginSuccess(data, true, false))
        }
    }
}


export const signUpThunk = (user: UsersType): ThunkType => {
    return async (dispatch) => {
        await apiUsers.signUp(user)
        dispatch(actionsUsers.signUpSuccess(user, true))
    }
}

export const getSingleUserThunk = (id: number): ThunkType => {
    return async (dispatch) => {
        let data = await apiUsers.getSingleUser(id)
        dispatch(actionsUsers.userSelected(data))
    }
}

export const updateProfileInfoThunk = (id: number, user: UsersType): ThunkType => {

    return async (dispatch) => {
        let data = await apiUsers.updateUserInfo(id, user)
        dispatch(actionsUsers.profileInfoUpdated(data))
    }
}

export const deleteProfileThunk = (id: number): ThunkType => {

    return async (dispatch) => {
        dispatch(actionsUsers.isLoadingChanged(true))
        await apiUsers.deleteProfile(id)
        dispatch(actionsUsers.deleteProfile(id))
        dispatch(actionsUsers.isLoadingChanged(false))
    }
}


export default UsersReducer