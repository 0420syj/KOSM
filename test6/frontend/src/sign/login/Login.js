import React, {useState} from 'react';
import LoginForm from './LoginForm';
import BeforeMenu from '../../menu/before/BeforeMenu'
import {Link} from 'react-router-dom';
const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    return ( 
        <div>
            <BeforeMenu/>
            <LoginForm isLogin = {isLogin} setIsLogin = {setIsLogin}/>
        </div>
    )
}

export default Login;