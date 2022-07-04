import React, {ComponentType, useEffect} from 'react';
import {AppStateType} from "../state/redux-store";
import {connect} from "react-redux";
import {useNavigate} from "react-router";

type MapStateToPropsType= {
    isAuth:boolean
}
const mapStateToProps = (state:AppStateType ) : MapStateToPropsType => {
  return {
      isAuth:state.auth.isAuth
  }
}

function WithAuthRedirect  <T>(Component:ComponentType<T> )  {


    const RedirectComponent= (props:MapStateToPropsType)=> {

        const {isAuth, ...otherProps}= props;

        let navigate = useNavigate();
        useEffect(() => {
            if (!isAuth){
                return navigate("/login");
            }
        },[]);

        return <Component {...otherProps as T}/>
    }

    let ConnectedRedirectComponent= connect(mapStateToProps)(RedirectComponent)
    return ConnectedRedirectComponent
};

export default WithAuthRedirect;