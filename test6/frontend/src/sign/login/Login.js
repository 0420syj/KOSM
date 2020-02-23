import React, {useState} from 'react';
import LoginForm from './LoginForm';
import BeforeMenu from '../../menu/before/BeforeMenu'
import {Link} from 'react-router-dom';
const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    return ( 
        <div>
            {
                localStorage.isLogin === 'false' ?
                <div>
                    <BeforeMenu/>
                    <LoginForm isLogin = {isLogin} setIsLogin = {setIsLogin}/>
                </div> :
                <Link to ='/'/>
            }
        </div>
    )
}

export default Login;