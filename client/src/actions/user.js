import axios from 'axios';

import { API_URL } from '../config';

import { setUser } from '../reducers/userReducer';

export const registration = (firstName, lastName, email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/registration`, {
                firstName,
                lastName,
                email,
                password
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);

        } catch (err) {
            console.log(err);
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            });
            dispatch(setUser(response.data.user));

            localStorage.setItem('token', response.data.token);
        } catch (err) {
            console.log(err);
            return new Error('Unknown email or password');
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);

        } catch (err) {
            console.log(err);
            localStorage.removeItem('token');
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {

            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            dispatch(setUser(response.data));

        } catch (err) {
            console.log(err);

        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            dispatch(setUser(response.data));
        } catch (err) {
            console.log(err);

        }
    }
}

export const updateProfile = (firstName, lastName, email, phone) => {
    return async dispatch => {
        try {
            const response = await axios.put(`${API_URL}api/auth/profile`,
                {
                    firstName,
                    lastName,
                    email,
                    phone,
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

            dispatch(setUser(response?.data?.user));

        } catch (err) {
            console.log(err);
        }
    }
}

export const deleteUser = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/auth/user`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
           
            localStorage.removeItem('token');
        } catch (err) {
            console.log(err.response);
        }
    }
}

