import {useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import p from "../Posts.module.css";
import addform from "../Posts.module.css";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import GifBoxRoundedIcon from '@mui/icons-material/GifBoxRounded';


type LoginUserModelType = {
    post: string,

};

type AddPostFormType = {
    addPost: (newPostBody: string) => void,
    buttonType: string
}


export const TextInputMessageForm = React.memo(({addPost , buttonType}: AddPostFormType) => {


    const {register, handleSubmit, resetField, formState: {errors}} = useForm<LoginUserModelType>();


    const onSubmit = handleSubmit(data => {
        addPost(data.post)
        console.log(data.post)
        resetField('post')
    })


    return <>
        <form onSubmit={onSubmit}>
            <div className={addform.flex_container}>


                <div className={addform.text_field}>
                    <TextField
                        {...register("post", {required: true, maxLength: 300})}
                        error={!!errors.post}
                        type='text'

                        id="filled-multiline-flexible"
                        label="Add your post"

                        multiline
                        color={"info"}
                        style={{width: "100%", padding: "5px" , height:'75px'}}

                        sx={{
                            bgcolor: 'AppWorkspace',
                            boxShadow: 1,
                            borderRadius: 2
                        }}

                    />
                </div>

                <div className={p.btn_container}>

                    <Button className={p.btn}
                            style={{backgroundColor: '#6c7272'}}
                            size='small'
                            type="submit"
                            variant="contained"

                    >{buttonType}</Button>


                    <div className={p.image_upload}>


                        <label htmlFor="contained-button-file">
                            <AddIcon/>

                        </label>


                        <AddAPhotoIcon/>
                        <GifBoxRoundedIcon/>
                    </div>

                </div>


            </div>
        </form>

    </>
});

