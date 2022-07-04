import {NavLink} from "react-router-dom";
import  style from './Navbar.module.css'

import React, {useState} from "react";
import {AllNavbarType} from "./NavbarContainer";
import {slide as Menu} from 'react-burger-menu'


function Navbar(props: AllNavbarType) {


    const [menuOpenState, setMenuOpenState] = useState(false)

    const checkActive = (isTrue?: boolean) => (!props.isTrue ? '' : style.active)

    const friends = props.names.map((post) => <div key={post.id} className={style.dot}>{post.name}</div>)

    const showSettings = (event: any) => {
        event.preventDefault();
    }
    const closeMenu = () => {
        setMenuOpenState(!menuOpenState)
    }

    const toggleMenu = () => {
        setMenuOpenState(!menuOpenState)
    }


    let styles = {

        bmOverlay: {
            background: 'none',

        },
        bmMenu: {
            background: 'none',
            overflow: 'revert',
        },
        bmMenuWrap: {
            position: 'absolute',

            height: '100%'
        },
        reactBurgerMenuBtn: {
            width: '50px',
            height: '50px'
        },
    }


    return (
        <>

            <div className={style.burger_menu} onClick={() => toggleMenu()}><span></span></div>
            {/*<button onClick={() => toggleMenu()}/>*/}
            <Menu styles={styles}  onStateChange={(state) => setMenuOpenState(state.isOpen)}
                  width={200}>

                <nav className={style.nav}>

                    <div className={style.item}>
                        <NavLink id="home" className={style.menu_item} onClick={() => closeMenu()}
                                 to='./profile'>Profile</NavLink>
                    </div>
                    <div className={style.item}>
                        <NavLink id="users" className={style.menu_item}
                                 onClick={() => closeMenu()} to='/users'>Users </NavLink>
                    </div>
                    <div className={style.item}>
                        <NavLink id="dialogs" className={style.menu_item} onClick={() => closeMenu()}
                                 to='/dialogs'>Messages </NavLink>
                    </div>

                    <div className={style.item}>
                        <NavLink id="news" className={style.menu_item} onClick={() => closeMenu()} to='/news'>News</NavLink>
                    </div>
                    <div className={style.item}>
                        <NavLink id="music" className={style.menu_item} onClick={() => closeMenu()}
                                 to='/music'>Music</NavLink>
                    </div>
                    <div className={style.item}>
                        <NavLink id="settings" className='menu_item' onClick={() => closeMenu()}
                                 to='/settings'>Settings</NavLink>
                    </div>

                    <div className={style.friends}> Friends</div>
                    <div>{friends}</div>

                </nav>
            </Menu>
        </>
    )
}

export default Navbar;



