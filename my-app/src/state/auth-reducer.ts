import {loginAPI} from "../api/api";
import {Dispatch} from "redux";
import {handleServerAppError} from "../utils/error-utils";
import {setAppStatusAC} from "./app-reducer";
import {setUserProfile} from "./profile-reducer";


export type dataStateofLoginType = {
    id: number,
    email: string,
    login: string,
    isAuth?: boolean //ne fakt
}


export type LoginType = {
    email: string,
    password: string,
    rememberMe?: boolean
}

// export type initialStateOfLoginType = {
//     isFetching?: boolean,
//     error: string | null
// }

type initialStateType = typeof initialStateOfLogin

let initialStateOfLogin = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,

    isFetching: true,
    error: ''
}


export const authReducer = (state = initialStateOfLogin, action: authReducerType): initialStateType => {


    switch (action.type) {
        case "AUTH/SET-USER-DATA":

            return {...state, ...action.payload};

        case "AUTH/SET-ERROR":

            return {...state, error: action.error};

        case "AUTH/TOOGLE-IS-FETCHING":

            return {...state, isFetching: action.isFetching};
        default:
            return state

    }
};

type authReducerType = setAuthUserDataType | setToogleIsFetchingACType | setErrorACType
export type setAuthUserDataType = ReturnType<typeof setAuthUserData>
export type setToogleIsFetchingACType = ReturnType<typeof setToogleIsFetching>
export type setErrorACType = ReturnType<typeof setError>


// type setAuthUserType= {
//     id:number | null,email:string | null,login:string | null, isAuth:boolean
// }
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'AUTH/SET-USER-DATA',
        payload: {id, email, login, isAuth}
    } as const
}

export const setError = (error: string) => {
    return {
        type: 'AUTH/SET-ERROR',
        error
    } as const
}
export const setToogleIsFetching = (isFetching: boolean) => {
    return {
        type: 'AUTH/TOOGLE-IS-FETCHING',
        isFetching: isFetching

    } as const
}


export const AuthorizationTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setToogleIsFetching(true))

    const data = await loginAPI.me();
    console.log('data', data);
    debugger;
    if (data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    } else {
        handleServerAppError(dispatch, data)
    }
    dispatch(setToogleIsFetching(false))
    dispatch(setAppStatusAC('failed'))
}


export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setToogleIsFetching(true))

    const data = await loginAPI.login(email, password, rememberMe)

    if (data.resultCode === 0) {
        dispatch(AuthorizationTC())
    } else {
        handleServerAppError(dispatch, data)
    }

    dispatch(setToogleIsFetching(false))
    dispatch(setAppStatusAC('failed'))
}

export const loginOut = () => async (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setToogleIsFetching(true))


    const data = await loginAPI.loginOut()

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
        dispatch(setUserProfile(null))
    } else {
        handleServerAppError(dispatch, data)
    }
    dispatch(setToogleIsFetching(false))
    dispatch(setAppStatusAC('failed'))
}
