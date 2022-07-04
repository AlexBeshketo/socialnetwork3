
import {
    addPost,
    PostsPropsType,

} from "../../../state/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {AppStateType} from "../../../state/redux-store";




type MSTPType = {
    posts: Array<PostsPropsType>,

}

type MDTPType= {
    addPost: (newPostBody:string)=> void,
}


export type AllPostsPropsType= MSTPType & MDTPType;

const mapStateToProps = (state:AppStateType): MSTPType => {
    return {
        posts: state.profilePage.posts,
    }
}




const PostsContainer = connect(mapStateToProps,{addPost}) (Posts);

export default PostsContainer
