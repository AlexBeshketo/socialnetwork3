import React from 'react';
import LoginForm from "./LoginForm";
import { loginTC} from "../../state/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../state/redux-store";


type MapDispatchToPropsType= {
    loginTC: (email:string, password:string, rememberMe:boolean)=> void
}

type mapStateToPropsType = {
    isAuth: boolean
    errorLoginServer: string
}

export type LoginComponentType= MapDispatchToPropsType & mapStateToPropsType

const LoginComponent = ({loginTC,isAuth,errorLoginServer }:LoginComponentType) => {

    console.log(isAuth)
    return (
        <div>
            <LoginForm isAuth={isAuth} loginTC={loginTC} errorLoginServer={errorLoginServer} />
        </div>
    );
};

const mapStateToProps =(state:AppStateType):mapStateToPropsType=> ({
    isAuth: state.auth.isAuth,
    errorLoginServer:state.auth.error
})

export default connect (mapStateToProps, {loginTC})(LoginComponent);