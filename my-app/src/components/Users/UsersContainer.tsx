import React, {ComponentType} from "react";
import {
    changePageThunkCreator,
    followThunkCreator,
    getUsersThunkCreator,
    unfollowThunkCreator,
    usersType
} from "../../state/users-reducer";
import {AppStateType} from "../../state/redux-store";

import {connect} from "react-redux";
import {Users} from "./Users/Users";

import WithAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";



export type ResponseUsersType = {
    error: string | null,
    items: usersType[]
    totalCount: number
}

type mapStateToPropsType = {
    users: Array<usersType>
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: [],

}

type mapDispatchToPropsType = {

    unfollowThunkCreator: (userId: number) => void
    followThunkCreator: (userId: number) => void
    followSuccess: (userId: number) => void
    unfollowSucess: (userId: number) => void
    setUser: (users: Array<usersType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void

    setFollowingInProgress: (isFetching: boolean, userId: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    changePageThunkCreator: (CurrentPage: number, pageSize: number) => void
}

export type UsersAPIContainerType = mapStateToPropsType & mapDispatchToPropsType

class UsersAPIContainer extends React.Component<UsersAPIContainerType> {


    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }
    changeActualPage = (CurrentPage: number) => {
        this.props.changePageThunkCreator(CurrentPage, this.props.pageSize)
    }


    render() {

        return (
            <>
                <Users users={this.props.users}
                       follow={this.props.followThunkCreator}
                       unfollow={this.props.unfollowThunkCreator}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       onPageChanged={this.changeActualPage}
                       currentPage={this.props.currentPage}
                       followingInProgress={this.props.followingInProgress}
                       isFetching={this.props.isFetching}
                />
            </>
        )
    }
}


let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {
        followThunkCreator, unfollowThunkCreator, changePageThunkCreator, getUsersThunkCreator }),
        WithAuthRedirect)(UsersAPIContainer)






