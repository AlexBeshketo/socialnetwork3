import React, {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from "@mui/material";

type StatusType= {
    status: string
    updateStatus: (status: string) => void
}

 export const StatusFuncComp = ({status, updateStatus}:StatusType) => {
    
    
    useEffect(()=>{
        setStatusRes(status)
    },[status])

    const [editMode, setEditMode] = useState(false)
    const [statusRes, setStatusRes] = useState(status)

    const onTextChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setStatusRes(e.currentTarget.value)
    }

    const onClick = ()=> {
        setEditMode(true)
    }

    const onBlur = ()=> {
        setEditMode(false)
        updateStatus(status);
    }


    return (
        <>
            {!editMode ?

                <div>
                    <span onDoubleClick={onClick}>{status || 'Write your status here'}</span>
                </div>

                : <div>
                    <TextField autoFocus value={statusRes}  onBlur={onBlur} size={'small'} onChange={onTextChange} variant={'filled'} type="text"/>
                </div>


            }
        </>
    );
};
