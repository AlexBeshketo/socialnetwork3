import {addNewMessage, MessagesPropsType} from "../../state/messages-reducer";
import Dialogs from "./Dialogs/Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../state/redux-store";
import WithAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import React from "react";
import {getStatusThunkCreator, getUserProfileThunkCreator, updateStatusThunkCreator} from "../../state/profile-reducer";

// type DialogsContainerType = {
//     store: StorePropsType
// }
// export function DialogsContainer(props: DialogsContainerType) {
//
//
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store: StorePropsType) => {
//
//                     const getState = store.getState()
//
//                     const addPost = () => {
//                         store.dispatch(AddNewMessageActionCreator())
//                     }
//
//                     const onChangeCallback = (text: string) => {
//                         store.dispatch(updateNewMessageActionCreator(text))
//                     }
//
//                     return (
//
//                         <Dialogs users={getState.dialogsPage.users} messages={getState.dialogsPage.messages}
//                                  newMessagesBody={getState.dialogsPage.newMessagesBody}
//                                  addPost={addPost} onChangeCallback={onChangeCallback}/>)
//                 }
//             }
//         </StoreContext.Consumer>
//     )
//
// }


type MSTPType = {
    messages: Array<MessagesPropsType>,
}

type MDTPType = {
    addNewMessage: (newMessageBody: string) => void
}

export type AllDialogsPropsType = MSTPType & MDTPType

let mapStateToProps = (state: AppStateType): MSTPType => {
    return {
        messages: state.dialogsPage.messages,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {addNewMessage}),
    WithAuthRedirect)(Dialogs)


