import React, {useState, useEffect, useContext} from 'react';
import './Login.scss';
import { login, getCurrentUser } from '../../util/APIUtils';

const Login = (props) => {
    const [userinfo, setUserInfo] = useState({
        usernameOrEmail:'',     //username이랑 email나누기
        phonenumber: '',
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
                localStorage.setItem('email', props.user.email);
                localStorage.setItem('username', props.user.username);
                localStorage.setItem('password', props.user.password);
                localStorage.setItem('phonenumber', props.user.phonenumber);
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
                <div className='loginTitle'>로그인</div>
                <form className='loginForm' onSubmit={onSubmit}>
                    <div className='loginFormContainer'>
                        <div className='loginSubTitle'>이메일</div>
                        <input onChange={onChange} name='usernameOrEmail' className='form-control'/>
                    </div>
                    <div className='loginFormContainer'>
                        <div className='loginSubTitle'>비밀번호</div>
                        <input name='password' onChange={onChange} type='password' className='form-control'/>
                    </div>
                    <div className='loginFindContainer'>
                        <div className='loginFindInfo'>ID찾기 / 비밀번호 찾기</div>
                    </div>
                <div className='loginButtonContainer'>
                    <button className='btn btn-secondary btn-lg btn-block'>LOGIN</button>
                </div>
                <div className='loginSignUpContainer'>
                    <div className='loginSignUpText'>아직 아이디가 없으신가요?</div>
                    <div className='loginSignUp'>회원가입</div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login;