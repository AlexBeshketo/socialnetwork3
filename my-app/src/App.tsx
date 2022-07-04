import React, {Suspense, useEffect} from "react";
import './App.css';

import {Route, Routes} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";


import {NavbarContainer} from "./components/Navbar/NavbarContainer";
// import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {AppStateType, useAppDispatch, useAppSelector} from "./state/redux-store";
// import UsersAPIContainer from "./components/Users/UsersContainer";
import {messagesReducerActionsType} from "./state/messages-reducer";
import {getUserProfileThunkCreator, profileReducerActionsType} from "./state/profile-reducer";
import {UsersACTypes} from "./state/users-reducer";

// import ProfileContainer from "./components/Profile/ProfileContainer";
import {ProfileWithParam} from "./components/Profile/ProfileWithParam";

import LoginComponent from "./components/Login/LoginComponent";
import Footer from "./components/Footer/Footer";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "./components/ErrosSnackBar/errorsSnackBar";
import UsersAPIContainer from "./components/Users/UsersContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {AuthorizationTC} from "./state/auth-reducer";
import {useNavigate} from "react-router";


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));

type ActionTypes = profileReducerActionsType | messagesReducerActionsType | UsersACTypes


export type AppPropsType = {
    store: AppStateType,
    dispatch: (action: ActionTypes) => void
}

function App(props: AppPropsType) {


    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.auth.id)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const status = useAppSelector((state) => state.app.status)

    useEffect(() => {
        debugger;
        dispatch(AuthorizationTC())
    }, [])


    useEffect(() => {
        if (id) {
            dispatch(getUserProfileThunkCreator(id))
        }
    }, [id])


    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            return navigate("/login");
        }

    }, [isAuth]);

    return (
        <div className="container">
            <div className='main-container-grid'>

                <div className="Header">
                    <HeaderContainer/>
                    <div className="Navbar">
                        <div className="loading">
                            {status === 'loading' && <LinearProgress/>}
                        </div>
                        <NavbarContainer/>
                    </div>


                </div>


                <div className='Content'>

                    <Suspense fallback={<LinearProgress/>}>
                        <Routes>

                            <Route path={'/profile'} element={<ProfileContainer/>}/>
                            <Route path={'/profile/:userId'} element={<ProfileWithParam/>}/>
                            <Route path={'/users'} element={<UsersAPIContainer/>}/>
                            <Route path={'/dialogs'} element={<DialogsContainer/>}/>

                            <Route path={'/news'} element={<News/>}/>
                            <Route path={'/music'} element={<Music/>}/>
                            <Route path={'/settings'} element={<Settings/>}/>
                            <Route path={'/login'} element={<LoginComponent/>}/>

                            {/*<Route path='/404' element={<h1>Page not Found</h1>}/>*/}
                            {/*<Route path='*' element={<Navigate to='/404'/>}/>*/}

                        </Routes>
                    </Suspense>
                </div>

                <div className="Footer">
                    <ErrorSnackbar/>
                    <Footer/>
                </div>

            </div>
        </div>
    )
}

export default App;

