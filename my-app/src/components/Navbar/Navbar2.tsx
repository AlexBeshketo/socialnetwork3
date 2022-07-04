import React from 'react';
import './Navbar2.css'

const Navbar2 = () => {
    return (
        <div>
            <input type="checkbox" id="hamburger-input" className="burger-shower"/>
            <label id="hamburger-menu" htmlFor="hamburger-input">
                <nav id="sidebar-menu">
                    <h3>Menu</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Store</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </label>

            <div className="overlay"></div>
        </div>
    );
};

export default Navbar2;