import p from './ProfileInfo.module.css'
import React from "react";
import {ProfileType} from "../../../state/profile-reducer";

import WebIcon from '@mui/icons-material/Web';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ProfileInfoSceleton from "./ProfileInfoSceleton";
import {StatusFuncComp} from "./Status/StatusFuncComp";
import AvaChange from "./AvaChange";

type ProfileInfoType = {
    profile: ProfileType
    isFetching: boolean
    status: string
    updateStatus: (status: string) => void
    isOwnerAccount: boolean
    savePhotoTC: (files: any) => void
}

const ProfileInfo = ({profile, isFetching, status, updateStatus, isOwnerAccount, savePhotoTC}: ProfileInfoType) => {

    if(!profile ){
        return <span>...loading</span>
    }
    const {photos, userId, contacts, fullName, aboutMe, lookingForAJob, lookingForAJobDescription} = profile;


    return (
        <div className={p.profileInfo}>

            {isFetching

                ? <ProfileInfoSceleton/>

                : (<div className={p.descriptionBlock}>
                        <div className={p.container_left}>
                            <div className={p.avatar_container}>
                                {photos && <img
                                    src={photos.large != null ? photos.large : 'https://icon-library.com/images/users-icon-png/users-icon-png-15.jpg'}
                                    alt=""
                                    className={p.avatar}
                                />}
                                {isOwnerAccount && (<AvaChange savePhotoTC={savePhotoTC}/>)}
                            </div>

                        </div>

                        <div className={p.container_right}>

                            <div>
                                <h4>{fullName}</h4>
                                <StatusFuncComp status={status} updateStatus={updateStatus}/>
                            </div>

                            <div className={p.looking_job_container}>
                                <div>
                    <span className={p.logo}>Looking for a job &nbsp;
                        <img className={p.logo}
                             src={lookingForAJob ? 'https://cdn-icons-png.flaticon.com/512/6276/6276686.png' : 'https://cdn-icons-png.flaticon.com/512/753/753345.png'}
                             alt=""/>
                    </span>
                                </div>
                                <div>
                    <span className={p.logo}>Looking for a job description  &nbsp;
                        <img className={p.logo}
                             src={lookingForAJobDescription ? 'https://cdn-icons-png.flaticon.com/512/6276/6276686.png' : 'https://cdn-icons-png.flaticon.com/512/753/753345.png'}
                             alt={'yea'}/>
                    </span>
                                </div>
                            </div>
                            <div className={p.logo_contacts}>
                       <span className={p.logo_span}>
                       <WebIcon color={contacts.website === null ? 'disabled' : 'primary'}
                       />
                       </span>
                                <span className={p.logo_span}><InstagramIcon className={p.logo}
                                                                             color={contacts.instagram === null ? 'disabled' : 'primary'}/>
                        </span>
                                <span className={p.logo_span}><GitHubIcon className={p.logo}
                                                                          color={contacts.github === null ? 'disabled' : 'primary'}/>  </span>
                                <span className={p.logo_span}><LinkedInIcon className={p.logo}
                                                                            color={contacts.linkedin === null ? 'disabled' : 'primary'}/></span>
                                <span className={p.logo_span}><FacebookIcon className={p.logo}
                                                                            color={contacts.facebook === null ? 'disabled' : 'primary'}/></span>
                            </div>
                        </div>
                    </div>
                )}


        </div>
    )
}
export default ProfileInfo




