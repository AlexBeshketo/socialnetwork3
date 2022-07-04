import React from 'react';
import axios from "axios";
import {ResponseUsersType} from "../components/Users/UsersContainer";
import {PostDeleteAxiosType} from "../components/Users/Users/Users";
import {ProfileType} from "../state/profile-reducer";
import {dataStateofLoginType, LoginType} from "../state/auth-reducer";



type GetUsersType = {
    currentPage: number
    pageSize: number
}

export type AxiosType<T> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export type PhotoData= {
    photos:{
        small: null| string, large: null | string
    }
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "9545288c-77f6-452d-b8fb-8b665e1a7f6b"
    }

});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return (
            instance.get<ResponseUsersType>(`users?page=${currentPage}&count=${pageSize}`,
                {withCredentials: true})
                .then(response => {
                    return response.data
                }));
    }
}

// export const getUsers = (currentPage: number, pageSize: number) => {
//     return (
//         instance.get<ResponseUsersType>(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
//             {withCredentials: true})
//             .then(response => {
//                 return response.data
//             }));
// };


export const folowwed_unfollowedAPI = {

    unfollowUsers(id: number) {
        return (
            instance.delete<PostDeleteAxiosType>(`follow/${id}`)
                .then(response => {
                    return response.data
                }))
    },

    followUsers(id: number) {
        return (
            instance.post<PostDeleteAxiosType>(`follow/${id}`
                , {},)
                .then(response => {
                    return response.data
                }))
    }
}

export const profileAPI = {

    getUserProfile(userId:number ) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
         .catch(err => {
             return null
         })
    },

    getStatus (userId:number) {
        return instance.get<string>('profile/status/' + userId)
            .then(response => {
                return response.data
            }).catch(err => {
                return null
            })
    },

    updateStatus (status:string) {
        return instance.put<AxiosType<{}>>('profile/status' , {status:status} )
            .then(response => {
                return response.data
            })
    },
    savePhoto (image:any) {
        let formData = new FormData();

        formData.append("image", image);

        return instance.put<AxiosType<PhotoData>>('profile/photo' , formData, {
            headers: {'Content-Type': 'multipart/form-data'} } )

            .then(response=> {
                return response.data
            })
    }

}

export const loginAPI = {

    me () {
        return (
            instance.get<AxiosType<dataStateofLoginType>>('auth/me')
                .then(response => {
                    return response.data
                })
        )
    },
    login (email:string, password:string, rememberMe:boolean) {
        return (
            instance.post<AxiosType<{userId:string}>>('auth/login', {email, password, rememberMe})
                .then(response => {
                    return response.data
                })
        )
    },
    loginOut () {
        return  instance.delete<AxiosType<any>>('auth/login')
            .then(response => {
                return response.data
            })
    }

}



