import {folowwed_unfollowedAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {ActionsAppType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError} from "../utils/error-utils";
import {followUnfollow} from "../utils/helper-utils";


export type DialogsPageType = {
    users: Array<DialogsPropsType>,
    messages: Array<MessagesPropsType>,
    newMessagesBody: string
}
export type DialogsPropsType = {
    name: string,
    id: number
}
export type MessagesPropsType = {
    message: string,
    id: number,
}

export type usersType = { name: string, id: number, uniqueUrlName: null | string, photos: { small: null | string, large: null | string }, status: null | string, followed: boolean }

export type initialStateOfDialogsPageType = {
    users: Array<usersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: any


}

// users: [
//     {
//         id: 1, followed: false,
//         name: 'Aleksandr',
//         photoURL: 'https://glavcom.ua/img/article/6664/16_main.jpg',
//         status: 'А я вам сейчас покажу, откуда на Беларусть готовилось нападение. И если бы..',
//         location: {country: 'Belarus', city: 'Minsk'}
//     },
//
//     {
//         id: 1,
//         followed: false,
//         name: 'Elon',
//         photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPTZvHXqUKrFwXtWTABC_5Lt6DC1u4x2vag&usqp=CAU',
//         status: 'Next I\'m buying Coca-Cola to put the cocaine back in. ',
//         location: {country: 'USA', city: 'Vashington'}
//     },
//     {
//         id: 1,
//         followed: false,
//         name: 'Volodymyr',
//         photoURL: 'https://cdnuploads.aa.com.tr/uploads/Contents/2022/01/27/thumbs_b_c_91bcd25b82c48f5ad9f6eb7e984c59d6.jpg?v=171350',
//         status: 'Hi, how are you?', location: {country: 'Ukraine', city: 'Kyiv'}
//     },
//     {
//         id: 1,
//         followed: false,
//         name: 'Volodymyr',
//         photoURL: 'https://eimg.pravda.com/images/doc/3/a/3ab75a7-povorozniuk-fb.jpg',
//         status: 'Vova, fuck them', location: {country: 'Ukraine', city: 'Cherkasy'}
//     }
// ]

let initialStateOfUsersPage: initialStateOfDialogsPageType = {
    users: [],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}


const updateObjectArray = (items:any, itemId:number, objPropName:string, newObjProps:any)=> {
return [...items.map((u:any)=>{
    if (u[objPropName]=== itemId) {
        return {...u, ...newObjProps}
    }
    return u
})
    ]
}

export const usersReducer = (state = initialStateOfUsersPage, action: UsersACTypes): initialStateOfDialogsPageType => {
    switch (action.type) {
        case  "FOLLOW" : {

            return {...state, users: updateObjectArray(state.users, action.id, "id",{followed: true} )}
        }
        case  "UNFOLLOW" : {
            return {...state, users: updateObjectArray(state.users, action.id, "id",{followed: false} )}
        }
        case "SET-USER" : {
            return {...state, users: action.users}
        }
        case "SET-CURRENT-PAGE" : {
            console.log({state, action})
            return {...state, currentPage: action.currentPage}
        }
        case "SET-TOTAL-USERS-COUNT" : {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case "TOOGLE-IS-FETCHING" : {
            return {...state, isFetching: action.isFetching}
        }
        case "SET-FOLLOWING-IN-PROGRESS" : {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id: number) => id !== action.userId)
            }
        }

        default:
            return state

    }
}

export type UsersACTypes =
    followACType
    | unfollowACType
    | addUsersACACType
    | setCurrentPageACType
    | setTotalUsersCountACType
    | ToogleIsFetchingACType
    | setFollowingInProgressACType
    | ActionsAppType
type followACType = ReturnType<typeof followSuccess>
type unfollowACType = ReturnType<typeof unfollowSuccess>
type addUsersACACType = ReturnType<typeof setUser>
type setCurrentPageACType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
type ToogleIsFetchingACType = ReturnType<typeof setToogleIsFetching>
type setFollowingInProgressACType = ReturnType<typeof setFollowingInProgress>

export const followSuccess = (id: number) => {
    return {
        type: 'FOLLOW',
        id: id
    } as const
}

export const unfollowSuccess = (id: number) => {
    return {
        type: 'UNFOLLOW',
        id: id
    } as const
}

export const setUser = (users: Array<usersType>) => {
    return {
        type: 'SET-USER',
        users: users

    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage: currentPage

    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        totalUsersCount: totalUsersCount

    } as const
}
export const setToogleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOOGLE-IS-FETCHING',
        isFetching: isFetching

    } as const
}

export const setFollowingInProgress = (isFetching: boolean, userId: number) => {
    return {
        type: 'SET-FOLLOWING-IN-PROGRESS',
        isFetching: isFetching,
        userId

    } as const
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return async (dispatch: Dispatch) => { //запрос получение юзеров-thunk

        dispatch(setToogleIsFetching(true)) //true-когда пошел запрос но запроса нет есть крутилка
        dispatch(setAppStatusAC('loading'))
// axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,{withCredentials:true}) //в api находится
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUser(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(setToogleIsFetching(false))
        dispatch(setAppStatusAC('succeeded'))
    }
}


export const changePageThunkCreator = (currentPage: number, pageSize: number) => {

    return async (dispatch: Dispatch) => {

        dispatch(setToogleIsFetching(true))
        dispatch(setAppStatusAC('loading'))

        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUser(data.items))
        dispatch(setCurrentPage(currentPage))
        dispatch(setToogleIsFetching(false))
        dispatch(setAppStatusAC('succeeded'))

    }
}








export const followThunkCreator = (userId: number) => {
    return async (dispatch: Dispatch) => {
        followUnfollow(dispatch, userId, folowwed_unfollowedAPI.followUsers, followSuccess)
    }
}



export const unfollowThunkCreator = (userId: number) => {
    return async (dispatch: Dispatch) => {

         followUnfollow(dispatch, userId, folowwed_unfollowedAPI.unfollowUsers, unfollowSuccess)
    }
}







