import React, {useState} from 'react';
import './LoginForm.scss';
import { login, getCurrentUser } from '../../util/APIUtils';
import {Link, useHistory} from 'react-router-dom';
const LoginForm = (props) => {
    const [userinfo, setUserInfo] = useState({
        email:'',     //username이랑 email나누기
        username: '',
        password:'',
    })

    const history = useHistory();
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
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('email', res.email);
                localStorage.setItem('username', res.username);
                localStorage.setItem('userId', res.id);
                console.log(localStorage.getItem('userId'));
                alert('로그인 완료');
                history.goBack();
                return ;
            }).catch(e => {
                alert('아이디/비밀번호가 다릅니다.');
                console.log(e);
            })
        }).catch(e => {
            alert('아이디/비밀번호가 다릅니다.');
            console.log(e);
        })
    }

    return ( 
        <div className='loginScreen'>
            <div className='loginContainer'>
                <div className='loginTitle'>
                    <div className='loginTitle2'>
                        Welcome KOSM
                    </div>
                    <div className='loginTitle3'>
                        Sign In
                    </div>
                </div>
                <form className='loginForm' onSubmit={onSubmit}>
                    <div className='loginFormContainer'>
                        <div className='loginSubTitle'>이메일</div>
                        <input onChange={onChange} name='email' className='loginSubInput'/>
                    </div>
                    <div style={{marginTop: '22px'}} className='loginFormContainer'>
                        <div className='loginSubTitle'>비밀번호</div>
                        <input name='password' onChange={onChange} type='password' className='loginSubInput'/>
                    </div>
                    <div style={{marginTop: '64px'}} className='loginButtonContainer'>
                        <button className='loginButton' onSubmit={onSubmit}>
                            Sign in
                        </button>
                    </div>
                    <div className='loginSignUpContainer'>
                        <div>
                            <Link to='/forgot'>
                                <div className='findPassword'>
                                    비밀번호 찾기
                                </div>
                            </Link>
                        </div>
                        <div style={{fontSize: '20px', color: '#bfbfbf'}}>&nbsp; | &nbsp;</div>
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

export default LoginForm;