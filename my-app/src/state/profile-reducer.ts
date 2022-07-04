// Types
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {ActionsAppType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError} from "../utils/error-utils";


export type ProfilePageType = {
    status: string | null
    posts: Array<PostsPropsType>,
    profile: null | ProfileType,
    isFetching: boolean,


}
export type  ProfileType = {
    "aboutMe": string | null,
    "contacts": {
        "facebook": string,
        "website": string | null,
        "vk": string | null,
        "twitter": string | null,
        "instagram": string | null,
        "youtube": string | null,
        "github": string | null,
        "mainLink": string | null,
        "linkedin": string | null
    },
    "lookingForAJob": boolean,
    "lookingForAJobDescription": string | null,
    "fullName": string | null,
    "userId": number,
    "photos": {
        "small": string | null,
        "large": string | null
    }
}

export type PostsPropsType = {
    id: number,
    message: string,
    like: number,
    follow: number
}


const initialStateOfProfileReducer: ProfilePageType = {
    status: '',
    isFetching: true,
    posts: [
        {id: 1, message: 'Hi, how are you?', like: 2, follow: 2},
        {id: 2, message: 'Its my first post ', like: 1, follow: 1},
        {id: 3, message: 'Whats your name? ', like: 1, follow: 4},
    ],
    profile: null
}

type PhotosType = {
    "small": string | null,
    "large": string | null
}

export const profileReducer = (state: ProfilePageType = initialStateOfProfileReducer, action: profileReducerActionsType): ProfilePageType => {
    switch (action.type) {
        case "PROFILE/ADD-POST":
            let newPost: PostsPropsType = {
                id: new Date().getTime(),
                message: action.newPostBody,
                like: 0,
                follow: 0
            };

            return {...state, posts: [...state.posts, newPost]}

        case "PROFILE/SET-USER-PROFILE" :
            return {...state, profile: action.profile}
        case "PROFILE/TOOGLE-IS-FETCHING" :
            return {...state, isFetching: action.isFetching}
        case "PROFILE/SET-USERS-STATUS" :
            return {...state, status: action.status}
        case "PROFILE/SAVE-PHOTO-SUCESS" :
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}

        default :
            return state
    }
}

export type profileReducerActionsType =
    addPostActionCreatorType
    | setUserProfileCreatorType
    | setToogleIsFetchingCreatorType
    | getUsersStatusType
    | ActionsAppType
    | setPhotoSucessType
type addPostActionCreatorType = ReturnType<typeof addPost>
// type updatePostActionCreatorType= ReturnType<typeof  updatePost>
type setUserProfileCreatorType = ReturnType<typeof setUserProfile>
type setToogleIsFetchingCreatorType = ReturnType<typeof setToogleIsFetching>
type getUsersStatusType = ReturnType<typeof setUsersStatus>
type setPhotoSucessType = ReturnType<typeof setPhotoSucess>

export const addPost = (newPostBody: string) => {
    return {type: "PROFILE/ADD-POST", newPostBody} as const
}

// export const updatePost = (newText: string) => {
//     return {
//         type: "UPDATE-POST",
//         newText: newText
//     } as const;
// }

export const setUserProfile = (profile: ProfileType | null) => {
    return {
        type: "PROFILE/SET-USER-PROFILE",
        profile: profile
    } as const;
}

export const setToogleIsFetching = (isFetching: boolean) => {
    return {
        type: 'PROFILE/TOOGLE-IS-FETCHING',
        isFetching: isFetching

    } as const
}

export const setUsersStatus = (status: string) => {
    return {
        type: 'PROFILE/SET-USERS-STATUS',
        status: status

    } as const
}

export const setPhotoSucess = (photos: PhotosType) => {
    return {
        type: 'PROFILE/SAVE-PHOTO-SUCESS',
        photos
    } as const
}


export const getUserProfileThunkCreator = (userId: number) => async (dispatch: Dispatch) => {
debugger;
    dispatch(setToogleIsFetching(true))
    dispatch(setAppStatusAC('loading'))

    const data = await profileAPI.getUserProfile(userId)
    if(!data){
        dispatch(setToogleIsFetching(false))
        dispatch(setAppStatusAC('succeeded'))
        return
    }
    dispatch(setUserProfile(data))
    dispatch(setToogleIsFetching(false))
    dispatch(setAppStatusAC('succeeded'))
}


export const getStatusThunkCreator = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(setToogleIsFetching(true))
    dispatch(setAppStatusAC('loading'))
    const data = await profileAPI.getStatus(userId)
    if(!data){
        dispatch(setToogleIsFetching(false))
        dispatch(setAppStatusAC('succeeded'))
        return
    }
    dispatch(setUsersStatus(data))
    dispatch(setToogleIsFetching(false))
    dispatch(setAppStatusAC('succeeded'))

}

export const updateStatusThunkCreator = (status: string) => async (dispatch: Dispatch) => {
    dispatch(setToogleIsFetching(true))
    dispatch(setAppStatusAC('loading'))
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setUsersStatus(status))

    } else {
        handleServerAppError(dispatch, data)
    }
    dispatch(setToogleIsFetching(false))
}

export const savePhotoTC = (file: any) => async (dispatch: Dispatch) => {
    dispatch(setToogleIsFetching(true))
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        console.log(data)

        dispatch(setPhotoSucess(data.data.photos))

    } else {
        handleServerAppError(dispatch, data)
    }
    dispatch(setToogleIsFetching(false))
}