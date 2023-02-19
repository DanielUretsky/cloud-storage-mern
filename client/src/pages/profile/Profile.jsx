import userAvatar from '../../assets/img/user-unknown-image.png';
import logoutImg from '../../assets/img/DropDownMenu/logout.png';
import supportImg from './../../assets/img/DropDownMenu/cloud-gray.png';
import deleteUserImg from '../../assets/img/ProfilePage/delete-user.png';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import { API_URL } from '../../config';

import sizeFormat from '../../utils/input/sizeFormat';

import { useDispatch, useSelector } from 'react-redux';

import { deleteAvatar, deleteUser, updateProfile, uploadAvatar } from '../../actions/user';

import { logout } from '../../reducers/userReducer';

import { useState } from 'react';

import 'react-circular-progressbar/dist/styles.css';
import './profile.scss'
import { Link } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
   

    const currentUser = useSelector(state => state.user.currentUser);
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : userAvatar;
    const userFirstName = currentUser.firstName;
    const userLastName = currentUser.lastName;
    const userEmail = currentUser.email;
    const userPhone = currentUser.phone;

    const [firstName, setFirstName] = useState(userFirstName);
    const [lastName, setLastName] = useState(userLastName);
    const [email, setEmail] = useState(userEmail);
    const [phone, setPhone] = useState(userPhone);

    const [disabledFields, setDisabledFields] = useState(true);
    
   
    const changeAvatar = (event) => {
        const file = event.target.files[0];
        dispatch(uploadAvatar(file));

    }

    const editUserProfile = () => {
        setDisabledFields(!disabledFields);
    }

    const updaterUserProfile = () => {
        dispatch(updateProfile(firstName, lastName, email, phone));
        setDisabledFields(true);
    }

    const deleteUserHandler = () => {
        if (window.confirm(`Are you sure you want to delete your account?`)) {
            dispatch(deleteUser());
            dispatch(logout());

        }
    }
    return (
        <div className='profile-wrapper'>

            <div className="profile-first-section">
                <div className="avatar-block">

                    <div className="avatar-block__avatar">
                        <img className='user-profile-avatar' src={avatar} alt="" />
                    </div>

                    <div className="avatar-block__title">
                        <p>{firstName + ' ' + lastName}</p>
                        <span>{email}</span>
                    </div>

                    <div className="avatar-block__avatar-buttons">
                        <label htmlFor="change-avatar">
                            <div className='change-avatar'>Upload avatar</div>
                            <input
                                onChange={event => changeAvatar(event)}
                                type="file"
                                id='change-avatar'
                                style={{ display: 'none' }}
                            />
                        </label>
                        <button
                            className='delete-avatar'
                            onClick={() => dispatch(deleteAvatar())}
                        >
                            Delete
                        </button>
                    </div>

                </div>

                <div className="profile-first-section__buttons">
                    <ul>
                        <li onClick={() => dispatch(logout())}>
                            <img src={logoutImg} alt="Logout" />
                            Logout
                        </li>

                        <Link to="/my-disk" style={{textDecoration: 'none'}}>
                            <li>
                                <img src={supportImg} alt="My disk" />
                                My disk
                            </li>
                        </Link>

                        <li onClick={() => deleteUserHandler()}>
                            <img src={deleteUserImg} alt="Delete account" />
                            Delete my account
                        </li>
                    </ul>
                </div>

            </div>
            <div className="profile-second-section">
                <div className="information-block">
                    <div className="information-block__item">
                        <div className='text-field'>
                            First name:
                        </div>
                        <div className='input-field'>
                            <input
                                onChange={(event) => setFirstName(event.target.value)}
                                type="text"
                                value={firstName}
                                disabled={disabledFields}
                            />
                        </div>
                    </div>

                    <div className="information-block__item">
                        <div className='text-field'>
                            Last name:
                        </div>
                        <div className='input-field'>
                            <input
                                onChange={(event) => setLastName(event.target.value)}
                                type="text"
                                value={lastName}
                                disabled={disabledFields}
                            />
                        </div>
                    </div>

                    <div className="information-block__item">
                        <div className='text-field'>
                            Email:
                        </div>
                        <div className='input-field'>
                            <input
                                onChange={(event) => setEmail(event.target.value)}
                                type="text"
                                value={email}
                                disabled={disabledFields}
                            />
                        </div>
                    </div>

                    <div className="information-block__item">
                        <div className='text-field'>
                            Phone:
                        </div>
                        <div className='input-field'>
                            <input
                                onChange={(event) => setPhone(event.target.value)}
                                type="text"
                                value={phone}
                                disabled={disabledFields}
                            />
                        </div>
                    </div>

                    <div className="information-block__buttons">
                        <button
                            onClick={() => updaterUserProfile()}
                            className='save-profile-settings'
                            disabled={disabledFields}
                        >
                            Save changes
                        </button>

                        <button
                            onClick={() => editUserProfile()}
                            className='edit-profile-settings'
                        >
                            Edit
                        </button>
                    </div>
                    <div className="status-block">
                        <h1>Used space</h1>
                        <div className="status-block__progress-bar">
                            <CircularProgressbar
                                maxValue={10737418240}
                                strokeWidth={10}
                                value={currentUser.usedSpace}
                                text={`${sizeFormat(currentUser.usedSpace)} / 10GB`}
                                styles={
                                    buildStyles({
                                        textSize: '10px'
                                    })
                                }
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;