import React from "react";
import Navbar from "./Navbar";
import {AppStateType} from "../../state/redux-store";
import {connect} from "react-redux";
import {DialogsPropsType} from "../../state/sidebar-reducer";
import {Dispatch} from "redux";



// export type NavbarContainerPostType = {
//     store: StorePropsType
// }

// export function NavbarContainer(props: NavbarContainerPostType) {
//
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//
//                 let state = props.store.getState()
//                 return (
//                     <Navbar names={state.sideBar.names} isTrue={state.sideBar.isTrue}/>
//                 )
//             }
//             }
//         </StoreContext.Consumer>
//     )
//
// }


type MSTPType = {
    names: Array<DialogsPropsType>,
    isTrue: boolean
}

type MDTPType = {

}

export type AllNavbarType = MSTPType & MDTPType

const mapStateToProps = (state: AppStateType): MSTPType => {
    return {
        names: state.sideBar.names,
        isTrue: state.sideBar.isTrue
    }
}


const mapDispatchToProps = (dispatch: Dispatch): MDTPType => {
    return {}
}


export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)

