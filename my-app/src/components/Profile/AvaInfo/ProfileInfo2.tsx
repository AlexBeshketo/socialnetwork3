import React from 'react';
import {ProfileType} from "../../../state/profile-reducer";
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const ProfileInfo2 = (props: ProfileType) => {

    const {photos, userId, contacts, fullName, aboutMe, lookingForAJob, lookingForAJobDescription} = props;

    return (
        <div>

            <div >
                <div style={{
                    margin: "18px 0px",
                    borderBottom: "1px solid grey"
                }}>


                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",

                    }}>
                        <div>
                            <img style={{width: "250px", height: "250px", borderRadius: "150px", textAlign: 'center'}}
                                 src={photos.large != null ? photos.large : 'https://icon-library.com/images/users-icon-png/users-icon-png-15.jpg'}/>

                        </div>
                        <div>
                            <h4>{fullName}</h4>
                            <h5>{aboutMe}</h5>
                            {/*<h5>{userId}</h5>*/}
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <h6>fghfhf</h6>
                                <h6>{contacts.website}</h6>

                                <h6>{contacts.instagram}</h6>
                                <h6>{contacts.github}</h6>
                                <h6>{contacts.vk}</h6>
                                <div className='linkedin'>
                                 <h6>{contacts.linkedin}</h6>
                                    <LinkedInIcon color={contacts.linkedin== null? "disabled" : "primary"}/>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="file-field input-field" style={{margin: "10px"}}>
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Update pic</span>

                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                </div>
                <div className="gallery">


                </div>
            </div>
        </div>
    );
};

export default ProfileInfo2;