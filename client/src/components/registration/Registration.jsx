import Logo from '../../assets/img/navbar-logo.svg';

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { registration } from '../../actions/user';

import { useDispatch, useSelector } from 'react-redux';

import './registration.scss';

const Registration = () => {

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,

    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        dispatch(registration(data.firstName, data.lastName, data.email, data.password))
    }


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    return (
        <div className="registration-wrapper">
            <div className='registration'>
                <div className="registration__header">
                    <img src={Logo} alt="" width={50} height={50} />
                    <h1><span className='first'>Sign</span> <span className='second'>up</span></h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='registration__form'>
                    <input
                        {...register("firstName", {
                            required: "First name is required"
                        })}
                        type="text"
                        placeholder="First name"
                    />
                    {errors.firstName && <p className='error-message'>{errors.firstName.message}</p>}

                    <input
                        {...register("lastName", {
                            required: "Last name is required"
                        })}
                        type="text"
                        placeholder="Last name"
                    />
                    {errors.lastName && <p className='error-message'>{errors.lastName.message}</p>}

                    <input
                        {...register("email", {
                            required: "Email is required", 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        type="text"
                        placeholder="Email"
                    />
                    {errors.email && <p className='error-message'>{errors.email.message}</p>}

                    <input 
                        {...register("password", {
                            required: "Password is required", 
                            minLength: {
                                value: 5,
                                message: "Password must have at least 5 characters"
                            }
                        })}
                        type="password" 
                        placeholder="Password" 
                    />
                    {errors.password && <p className='error-message'>{errors.password.message}</p>}

                    <button type="submit" disabled={!isValid}>Sign up</button>
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
}

export default Registration;