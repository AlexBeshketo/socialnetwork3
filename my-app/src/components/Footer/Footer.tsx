import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {
    return (

            <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 border-top">
                <div className="col-md-4 d-flex align-items-center" >
                    <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-muted" href="#">
                        <svg className="bi" width="24" height="24">
                            <LinkedInIcon className="bi"/>
                        </svg>
                    </a></li>
                    <li className="ms-3"><a className="text-muted" href="#">

                           <FacebookIcon className="bi"/>

                    </a></li>

                </ul>
            </footer>

    );
};



export default Footer;