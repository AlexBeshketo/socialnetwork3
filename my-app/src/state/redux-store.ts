import {applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import {profileReducer} from "./profile-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {messagesReducer} from "./messages-reducer";

import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";





export const rootReducer = combineReducers({
    profilePage: profileReducer,
    sideBar: sidebarReducer,
    dialogsPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app:appReducer


})
    /// dlya rrashirenija redux-devtools
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export type AppStateType = ReturnType<typeof rootReducer>

//typization automatically//
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));




export default store

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

//store.getState()  пишем в консоли
