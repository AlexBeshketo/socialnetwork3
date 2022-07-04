import Post from "./Post/Post";
import p from './Posts.module.css'

import React from "react";
import {AllPostsPropsType} from "./PostsContainer";
import {TextInputMessageForm} from "./AddPostForm/TextInputMessageForm";


function Posts({posts, addPost}: AllPostsPropsType) {

    let postsElement = posts
        .map((p => <Post key={p.id} id={p.id} message={p.message} like={p.like} follow={p.follow}/>))

    // const addPost = (newPostBody:string) => {
    //     props.addPost(newPostBody)
    // }


    return (
        <>

            <div className={p.posts}>
                {postsElement}
            </div>


            <div className={p.addPostBorder}>
                <TextInputMessageForm buttonType={'Add Post'} addPost={addPost}/>
            </div>

        </>
    )
}

export default Posts
