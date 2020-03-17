import React, {useState} from 'react';
import './SignUpForm.scss';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import { Mail,checkEmailAvailability,checkUsernameAvailability,signup} from '../../util/APIUtils';
// import { Form, Input, Button, Icon, notification } from 'antd';
import {ButtonToggle, Button} from 'reactstrap';
import Home from '../../home/Home';
import { MdGolfCourse } from 'react-icons/md';

const SignUp = ({match}) => {
    const history = useHistory();
    const [emailConfirm, setEmailConfirm] = useState('false');

    // const [success, setSuccess] = useState(false);
    
    const [userInfo, setUserInfo] = useState({
            'nickname': '',
            validNickName: false,
            'email':'',
            validEmail: false,
            'password': '',
            validPassWord: false,
            'confirmpassword': '',
            validConfirmPassWord: false,
    });

    const validateNickName = nickname => {
        // 글자수 : 3~8

        // 글자수 제한 조건 true 일때
        if(nickname.length >= 3 && nickname.length <= 8) 
        {
           // setUserInfo({
           //     ...userInfo,
            //    validNickName: true,
           //     nickname
           // });

            // 근우님 여기에요!
            checkUsernameAvailability(nickname)  
            .then(res => {
                if(res.available==true)
                    {
                        setUserInfo({
                            ...userInfo,
                            validNickName: true,
                            nickname
                        });
                    }
                else
                    {
                        setUserInfo({
                            ...userInfo,
                            validNickName: false,
                            nickname
                        });
                        alert("이미 있는 닉네임입니다.");
                    }
               
            },(error) => {
                console.log(error);
                //onsole.log(signupRequest.email);
                alert("fail");
            });
        
        
        }

        // 글자수 제한 조건 false 일때
        else
        {
            setUserInfo({
                ...userInfo,
                validNickName: false,
                nickname
            });
        }
    };

    const validateEmail = email => {
        // 이메일 형식 유효성 검사
        const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        
        // 이메일 형식 조건 true 일 때
        if(email.match(emailRegExp))
        {
            setUserInfo({
                ...userInfo,
                validEmail: true,
                email
            });

            checkEmailAvailability(email)  
            .then(res => {
                if(res.available==true)
                    {
                        setUserInfo({
                            ...userInfo,
                            validEmail: true,
                            email
                        });
                    }
                else
                    {
                        setUserInfo({
                            ...userInfo,
                            validEmail: false,
                            email
                        });
                        alert("이미 등록된 아이디입니다.");
                    }
               
            },(error) => {
                console.log(error);
                //onsole.log(signupRequest.email);
                alert("fail");
            });
        }

        // 이메일 형식 조건 false 일때
        else
        {
            setUserInfo({
                ...userInfo,
                validEmail: false,
                email
            });
        }
    }
    
    const validatePassWord = password =>
    {
        // 영문숫자 조합 6~20자
        // 참고 : https://www.w3resource.com/javascript/form/password-validation.php
        const passWordRegExp = /^.*(?=.{6,20})(?=.*\d)(?=.*[a-zA-Z]).*$/;
       
        if(password.match(passWordRegExp))
        {
            if(password !== userInfo.confirmpassword)
            {
                setUserInfo({
                    ...userInfo,
                    validPassWord: true,
                    validConfirmPassWord: false,
                    password
                });
            }

            else
            {
                setUserInfo({
                    ...userInfo,
                    validPassWord: true,
                    validConfirmPassWord: true,
                    password
                });
            }
        }

        else
        {
            setUserInfo({
                ...userInfo,
                validPassWord: false,
                validConfirmPassWord: false,
                password
            });
        }
    }

    const validateConfirmPassWord = confirmpassword => {
        if(userInfo.validPassWord)
        {
            if(userInfo.password === confirmpassword)
            {
                setUserInfo({
                    ...userInfo,
                    validConfirmPassWord: true,
                    confirmpassword
                });
            }

            else
            {
                setUserInfo({
                    ...userInfo,
                    validConfirmPassWord: false,
                    confirmpassword
                });
            }
        }

        else
        {
            setUserInfo({
                ...userInfo,
                validConfirmPassWord: false,
                confirmpassword
            })
        }
    }

    // 부트스트랩 input ClassName 지정 함수
    const inputClassNameHelper = boolean => { 
        switch(boolean)
        {
            case true:
                return 'is-valid'; // 초록색 input
            case false:
                return 'is-invalid'; // 빨간색 input
            default:
                return '';
        }
    };

    // 회원가입 버튼 표시
    const renderSubmitBtn = () => {
        // 폼 안의 모든 값이 유효한지 검사
        const validateForm = () => {
            return userInfo.validNickName
                && userInfo.validEmail
                && userInfo.validPassWord
                && userInfo.validConfirmPassWord;
        }

        if(validateForm()){return(true)}
    }

    const handleSubmit = (e) => {
        alert('이메일을 확인해주세요');
        e.preventDefault();
        const signupRequest = {
            username: userInfo.nickname,
            email:userInfo.email,
            phonenumber: userInfo.phonenumber,
            password: userInfo.password,
        }
        signup(signupRequest)       
        .catch((error) => {
            alert("fail");
        });
    }

    return (
        <div className='signUpScreen'>
            <div className='signUpContainer'>
                <div className='signUpTitle'>join KOSM</div>
                <div className='signUpTitle2'>Create your account</div>
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>닉네임</div>
                        <input
                            onBlur={e => {validateNickName(e.target.value)}}
                            type='text'
                            name='nickname'
                            id='nickname'
                            className={ `form-control ${inputClassNameHelper(userInfo.nickname && userInfo.validNickName)} input-nickname` }
                            placeholder='닉네임'/>
                    </div>
                    <div>
                        <div style={{marginBottom: '20px'}} className='signUpFormContainer'>
                            <div className='signUpSubTitle'>이메일</div>
                            <div style={{display:'flex'}}>
                                <input
                                    onBlur={e => {validateEmail(e.target.value)}}
                                    type='text'
                                    name='email'
                                    id='email'
                                    className={ `form-control ${inputClassNameHelper(userInfo.email && userInfo.validEmail)} input-email` }
                                    placeholder='example@example.com'
                                    aria-describedby="emailHelp"/>
                            </div>
                        </div>
                    </div>
                        <div  style={{display: 'flex', justifyContent: 'flex-end'}}>
                    </div>
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>비밀번호 (영문+숫자, 6~20자)</div>
                        <input
                            onChange={e => {validatePassWord(e.target.value)}}
                            type='password'
                            name='password'
                            id='password'
                            className={ `form-control ${inputClassNameHelper(userInfo.password && userInfo.validPassWord)} input-password`}/>
                    </div>                 
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>비밀번호 확인</div>
                        <input
                            onChange={e => {validateConfirmPassWord(e.target.value)}}
                            type='password'
                            name='confirm-password'
                            id='confirm-password'
                            className={ `form-control ${inputClassNameHelper(userInfo.confirmpassword && userInfo.validConfirmPassWord)} input-confirm-password` }/>
                    </div>                 
                    <div style={{width: '100%'}}>
                        <div style={{marginTop: '70px', display:'flex', justifyContent:'center'}}>
                        {
                            renderSubmitBtn() ?
                            <Button
                                type='submit'
                                onClick={handleSubmit}
                                className='successButton'>
                                <Link to='/'
                                    style={{color: 'inherit'}}>
                                    회원가입
                                </Link>
                            </Button>:
                            <Button className='failButton' disabled="disabled">회원가입</Button>
                        }
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default SignUp;