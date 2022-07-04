import h from "../Dialogs.module.css";
import React from "react";


type MessagesPropsType = {
    message: string
    key:string
}



export function Messages({message, key, ...props}: MessagesPropsType) {

    return (
        <>
            <div className={h.message}>{message}</div>
        </>
    )
}