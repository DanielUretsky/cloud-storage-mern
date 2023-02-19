import Logo from '../../assets/img/navbar-logo.svg'
import Input from '../../utils/input/Input';

import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../actions/user';

import './login.scss';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(state => state.user.isAuth);

    const handleLogin = async (event) => {
        event.preventDefault();
        const result = await dispatch(login(email, password));
        if (result instanceof Error) {
            setErrorMessage(result.message);
        } else {
            setErrorMessage("");
        }
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    return (
        <div className="login-wrapper">
            <div className='login'>
                <div className="login__header">
                    <img src={Logo} alt="" width={50} height={50} />
                    <h1><span className='first'>Sign</span> <span className='second'>in</span></h1>
                </div>
                <Input value={email} setValue={setEmail} type="text" placeholder="Email" />
                <Input value={password} setValue={setPassword} type="password" placeholder="Password" />
                <button onClick={handleLogin}>Sign in</button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <p>Don't have an account yet? <Link to='/registration'>Register</Link></p>
            </div>
        </div>
    );
}

export default Login;