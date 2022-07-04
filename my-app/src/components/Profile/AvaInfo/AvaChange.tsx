import {Button} from "@mui/material";
import React from "react";

import p from './ProfileInfo.module.css'

type AvaChangeType = {
    savePhotoTC: (files: any) => void
}
const AvaChange = ({savePhotoTC}: AvaChangeType) => {

    const onMainPhotoSelected = (e: any) => {
        debugger;
        if (e.target.files.length) {
            savePhotoTC(e.target.files[0])
        }
    }

    return (
        <>


            <Button className={p.button}
                variant="contained"
                component="label"
                size="small"
                color="info"
                style={{color: 'cornsilk', backgroundColor: '#B6ABAB'}}
            >
                <span>Upload Foto</span>
                <input
                    onChange={onMainPhotoSelected}
                    type="file"
                    hidden
                />
            </Button>
        </>
    );
};
export default AvaChange;