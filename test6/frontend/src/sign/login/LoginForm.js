import React, {useState, memo} from 'react';
import './LoginForm.scss';
import { login, getCurrentUser } from '../../util/APIUtils';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'reactstrap';

const LoginForm = memo((props) => {
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
            sessionStorage.setItem('accessToken', res.accessToken);
            getCurrentUser()
            .then(res => {
                sessionStorage.setItem('isLogin', 'true');
                sessionStorage.setItem('email', res.email);
                sessionStorage.setItem('username', res.username);
                sessionStorage.setItem('userId', res.id);
                history.push('./');
                return ;
            }).catch(e => {
                alert('아이디/비밀번호가 다릅니다.');
            })
        }).catch(e => {
            alert('아이디/비밀번호가 다릅니다.');
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
                        <Button className='loginButton' onSubmit={onSubmit}>
                            Sign in
                        </Button>
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
})

export default LoginForm;