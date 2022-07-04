import React, {useEffect} from "react";
import Header from "./Header";
import { useAppDispatch, useAppSelector} from "../../state/redux-store";

import {
    AuthorizationTC, loginOut,

} from "../../state/auth-reducer";



export const  HeaderContainer= ()=>  {

    const dispatch=useAppDispatch()
    const {isAuth,login} = useAppSelector((state)=> state.auth)

    // componentDidMount() {
    //   this.props.authorizationTC() //thunk get zapros avtorizaciji
    // }

    useEffect(()=>{
        dispatch(AuthorizationTC())
    },[dispatch])

    const onClickLoginOut= ()=> {
        dispatch(loginOut())
    }


        return (
                <Header onClickLoginOut={onClickLoginOut} isAuth={isAuth} login={login} />
        )
}


