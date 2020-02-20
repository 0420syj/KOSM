import React, {useState, useEffect, useContext} from 'react';
import './LoginForm.scss';
import { login, getCurrentUser } from '../../util/APIUtils';
import {Link} from 'react-router-dom';
import {ButtonToggle} from 'reactstrap';

const Login = (props) => {
    const [userinfo, setUserInfo] = useState({
        email:'',     //username이랑 email나누기
        username: '',
        password:'',
    })

    const onChange= (e) => {
        setUserInfo({
            ...userinfo,
            [e.target.name]:e.target.value
        });        
    }

    const onSubmit = (e) => {
        e.preventDefault();
        login(userinfo)
        .then(res => {
            localStorage.setItem('accessToken', res.accessToken);
            getCurrentUser()
            .then(res => {
                props.setUser(props.user.isLogin='true');
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('email', res.email);
                localStorage.setItem('username', res.username);
            }).catch(e => {
                console.log(e);
            })
        }).catch(e => {
            console.log(e);
        })
    }

    return ( 
        <div className='loginScreen'>
            <div className='loginContainer'>
                <div className='loginTitle'>welcome KOSM</div>
                <div className='loginTitle'>Sing In</div>
                <form className='loginForm' onSubmit={onSubmit}>
                    <div className='loginFormContainer'>
                        <div className='loginSubTitle'>이메일</div>
                        <input onChange={onChange} name='email' className='form-control'/>
                    </div>
                    <div className='loginFormContainer'>
                        <div className='loginSubTitle'>비밀번호</div>
                        <input name='password' onChange={onChange} type='password' className='form-control'/>
                    </div>
                <div className='loginButtonContainer'>
                    <ButtonToggle
                        color='info'
                        style={{
                            width: '100%'
                        }}>
                        Sign in
                    </ButtonToggle>
                </div>
                <div className='loginSignUpContainer'>
                    <div>
                        <Link to='/forgot'>
                            <div className='findPassword'>
                                비밀번호 찾기
                            </div>
                        </Link>
                    </div>
                    <div style={{fontSize: '10px'}}>&nbsp; | &nbsp;</div>
                    <div className='loginSignUpText'>아직 회원이 아니라면?</div>
                    <Link to='/signup'>
                        <div className='loginSignUp'>> 회원가입</div>
                    </Link>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login;