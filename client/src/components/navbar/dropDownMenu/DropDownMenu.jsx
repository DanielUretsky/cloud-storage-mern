import cloudImg from '../../../assets/img/DropDownMenu/cloud-gray.png';
import myProfileImg from '../../../assets/img/DropDownMenu/my-profile.png';
import logoutImg from '../../../assets/img/DropDownMenu/logout.png';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../../reducers/userReducer';

import './dropDownMenu.scss';

const DropDownMenu = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch()
    const initials = currentUser.firstName + ' ' + currentUser.lastName;
    const mail = currentUser.email;
    return (
        <>
            <div className="menu__title">
                <div className="menu__title-initials">
                    {initials}
                </div>
                <div className="menu__title-mail">
                    {mail}
                </div>
            </div>

            <div className="menu__item">
                <img src={myProfileImg} alt="my profile" />
                <Link to='/profile' style={{ textDecoration: 'none', color: 'inherit' }}>
                    My profile
                </Link>
            </div>
            <div className="menu__item">
                <img src={cloudImg} alt="my disk" />
                <Link to='/my-disk' style={{ textDecoration: 'none', color: 'inherit' }}>
                    My Disk
                </Link>
            </div>
            <div className="menu__item" onClick={() => dispatch(logout())}>
                <img src={logoutImg} alt="logout" />
                Logout
            </div>
        </>

    );
}

export default DropDownMenu;