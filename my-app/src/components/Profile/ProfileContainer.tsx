import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../state/redux-store";
import {
    getStatusThunkCreator,
    getUserProfileThunkCreator,
    ProfileType,
    savePhotoTC,
    updateStatusThunkCreator
} from "../../state/profile-reducer";

import WithAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";


export type ProfileContainerPropsType = mapStateToPropsType & mapDispatchToStateType
type OwnProps = {
    profile: ProfileType
    match?: any
    status: string
    getUserProfileThunkCreator: (userId: number) => void
    getStatusThunkCreator: (userId: number) => void
    updateStatusThunkCreator: (status: string) => void
    isFetching: boolean
    savePhotoTC: (files: any) => void
    authId: number
}

type mapStateToPropsType = {
    profile: ProfileType
    match: any
    isFetching: boolean
    status: string
    authId: number

}
type mapDispatchToStateType = {

    getUserProfileThunkCreator: (userId: number) => void
    getStatusThunkCreator: (userId: number) => void
    updateStatusThunkCreator: (status: string) => void
    savePhotoTC: (files: any) => void
}


class ProfileContainer extends React.Component<OwnProps> {

    refreshProfile() {
        let userId = this.props.match && Number(this.props.match?.userId)
        console.log('userId', userId)
        console.log('Props', this.props)
        if (!userId) {
            userId = this.props.authId
        }
        this.props.getUserProfileThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: OwnProps, prevState: OwnProps) {

        if (this.props.match?.userId !== prevProps.match?.userId) {
            this.refreshProfile()
        }

    }

    render() {
        return (
            <>
                {

                    <Profile savePhotoTC={this.props.savePhotoTC} profile={this.props.profile}
                             isFetching={this.props.isFetching}
                             isOwnerAccount={!this.props.match?.userId}
                             status={this.props.status} updateStatus={this.props.updateStatusThunkCreator}/>

                }
            </>
        );
    }
}

type ToOwnType = {
    match?: any
}

export let mapStateToProps = (state: AppStateType, ownProps: ToOwnType) => {
    return {
        profile: state.profilePage.profile,
        match: ownProps.match,
        isFetching: state.profilePage.isFetching,
        status: state.profilePage.status,
        authId: state.auth.id
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator, savePhotoTC
    }),
    WithAuthRedirect)(ProfileContainer)


// const WithUrlDataProfileContainer = withRouter(ProfileContainer)

// export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)