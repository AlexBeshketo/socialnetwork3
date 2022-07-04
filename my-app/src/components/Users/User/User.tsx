import React from 'react';

import styles from "../users.module.css"
import {usersType} from "../../../state/users-reducer";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";


type UsersType = {
    /*1.obj*/
    user: usersType
    /*2.func*/
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: []

}
export type PostDeleteAxiosType = {
    resultCode: number
    messages: string[]
    data: {}

}


export const User = ({user, follow, unfollow, followingInProgress}: UsersType) => {


    return (

        <>
            <div className={styles.inlinecontainer_img}>
                <NavLink to={'/profile/' + user.id}>
                    <img className={styles.avatar}
                         src={user.photos.small != null ? user.photos.small : 'https://icon-library.com/images/users-icon-png/users-icon-png-15.jpg'}
                         alt="photo"/>
                </NavLink>
            </div>

            <div className={styles.inlinecontainer + ' ' + styles.inlinecontainer_nameStatus}>
                <NavLink to={'/profile/' + user.id}>
                    <p className={styles.name}>{user.name}</p>
                </NavLink>

            </div>
            <div className={styles.container_buttons}>

                {user.followed
                    ? <Button style={{
                        padding: '6px',
                        color: 'black'
                    }} className={styles.button}
                              disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  unfollow(user.id)
                              }}><span>Unfollow</span></Button>

                    : <Button style={{
                        padding: '6px',
                        color: 'black'
                    }} className={styles.button}
                              disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>Follow</Button>}

            </div>
        </>
    )
};

// [...(new Array(6))].map((_, index) => <PizzaSkeleton key={index}

