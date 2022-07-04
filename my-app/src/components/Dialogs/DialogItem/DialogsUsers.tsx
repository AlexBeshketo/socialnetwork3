import h from '../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

export type DialogsItemType = {
    name: string,
    id: string
}


export function DialogsUsers  ({name, id, ...props}:DialogsItemType)  {
    return (
        <div className={h.user}>

            <NavLink to={'/dialogs/' + id}> {name} </NavLink>
        </div>
    )
}


