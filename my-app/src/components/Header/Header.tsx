import h from './Header.module.css'
import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {dataStateofLoginType} from "../../state/auth-reducer";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";


type HeaderPagePropsType = {
    // data: dataStateofLoginType
    isAuth:boolean
    login: string | null

    // isAuth: boolean
    onClickLoginOut: () => void

}

function Header({isAuth,login, onClickLoginOut}: HeaderPagePropsType) {

    console.log(isAuth)
    // const navigate = useNavigate()
    // //
    // // useEffect(() => {
    // //     if (!isAuth) {
    // //         navigate('/login')
    // //     }
    // // }, [data])

    // const {login} = data

    return (
        <header className={h.header}>

        <span>
        <img alt={'ava'}
             src={'https://forbes.ua/static/storage/thumbs/1200x630/e/21/e1a4730a-804e15fc5c92a055e2ab8e71133a921e.png?v=4645_1'}/>
        </span>
            <span className={h.login_absolute}>
                {isAuth
                    ? <span className={h.login}><Button onClick={onClickLoginOut}>{isAuth ? login : 'Log out'}</Button></span>
                    : <NavLink className={h.login} to={"/login"}>Login</NavLink>
                }
        </span>

        </header>
    )
}

export default Header