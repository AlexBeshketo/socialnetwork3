import React from "react";
import {AllDialogsPropsType} from "../DialogsContainer";
import h from '../Dialogs.module.css'
import {TextInputMessageForm} from "../../Profile/Posts/AddPostForm/TextInputMessageForm";
import {Avatar} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import {MessagesPropsType} from "../../../state/messages-reducer";


//
// const ws=new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'  )


function Dialogs({messages, addNewMessage}: AllDialogsPropsType) {


    return (

        <div className={h.main}>
            <div style={{textAlign: 'center', paddingTop: '30px'}}>
                <h4>Messages</h4>
            </div>
            <div className={h.messages_item}>
                {messages.map((d) =>
                    <Message key={d.id} user={d.user} message={d.message} id={d.id}/>
                )}

            </div>
            <div className={h.addMessageBorder}>
                <TextInputMessageForm buttonType={'addMessage'} addPost={addNewMessage}/>
            </div>

        </div>

    )
}

export default Dialogs


export const Message = ({user, id, message}: MessagesPropsType) => {

    const imageURl='https://upload.wikimedia.org/wikipedia/commons/3/33/Mr._Bean_2011.jpg'
    return (
        <>
            <div className={h.item}>
                <div id={h.talkbubble}>
                    <div className={h.one}>
                        <Avatar sx={{width: 56, height: 56}}
                                src='https://upload.wikimedia.org/wikipedia/commons/3/33/Mr._Bean_2011.jpg'/>
                    </div>
                    <div className={h.two}>
                        <div><span>{user}</span></div>
                        <div className={h.message}><span>{message}</span></div>
                        <div className={h.icons}>
                            <span><FavoriteBorderIcon className={h.logo} color={'primary'}/> </span>
                            <span><ShareIcon className={h.logo}/> </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

