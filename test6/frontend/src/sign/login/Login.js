import React, {useState} from 'react';
import LoginForm from './LoginForm';
import BeforeMenu from '../../menu/before/BeforeMenu'
import Footer from '../../menu/Footer'
import './Login.scss'

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <div className="container">
            <div className="top">
                <BeforeMenu />
            </div>
            {/* <div className="left">
                <SourceList />
            </div> */}
            <div className="login-content">
            <LoginForm isLogin = {isLogin} setIsLogin = {setIsLogin}/>
            </div>
            <div className="login-bottom">
                <Footer/>
            </div>
        </div>
    )
}

export default Login;