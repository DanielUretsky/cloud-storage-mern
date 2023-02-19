import Logo from '../../assets/img/navbar-logo.svg';
import userAvatar from '../../assets/img/user-unknown-image.png';

import DropDownMenu from './dropDownMenu/DropDownMenu';

import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../../config';

import { auth } from "../../actions/user";

import './navbar.scss'

const Navbar = () => {

    const isAuth = useSelector(state => state.user.isAuth);
    const currentUser = useSelector(state => state.user.currentUser);

    const dispatch = useDispatch();
    const location = useLocation();
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : userAvatar;

    useEffect(() => {
        dispatch(auth())

    }, [])

    return (
        <div className={`navbar ${location.pathname === '/my-disk' ? '' : 'fixed'}`}>

            <div className="navbar__logo">
                <img src={Logo} alt="Cloudy" />
                <p>Cloudy :)</p>
            </div>

            <div className="navbar__navigation">
                <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="navbar__navigation--home">
                        Home
                    </div>
                </NavLink>
            </div>



            <div className="container">
                {!isAuth &&
                    <Link to="login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="login">
                            Login
                        </div>
                    </Link>
                }
                {!isAuth &&
                    <Link to="registration" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="registration">
                            Sign up for free
                        </div>
                    </Link>
                }

                {isAuth &&
                    <div className="profile">
                        <img src={avatar} className="user-avatar" alt="User" onClick={() => setOpenProfileMenu(!openProfileMenu)} />
                        <div className={`menu ${openProfileMenu ? 'hidden' : ''}`}>
                            <DropDownMenu />
                        </div>
                    </div>
                }

            </div>
        </div>
    );
}

export default Navbar;