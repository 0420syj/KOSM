import React, {useState} from 'react';
import './SignUpForm.scss';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { checkEmailAvailability } from '../../util/APIUtils';
// import { Form, Input, Button, Icon, notification } from 'antd';
import {ButtonToggle} from 'reactstrap';

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
        if(nickname.length >= 3 && nickname.length <= 8) 
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
        }
    };

    const validateEmail = email => {
        // 이메일 형식 유효성 검사
        const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        
        if(email.match(emailRegExp))
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
        }
    }
    
    const validatePassWord = password =>
    {
        // 영문숫자 조합 6~20자
        // 참고 : https://www.w3resource.com/javascript/form/password-validation.php
        const passWordRegExp = /^.*(?=.{6,20})(?=.*\d)(?=.*[a-zA-Z]).*$/;
        
        if(password.match(passWordRegExp))
        {
            setUserInfo({
                ...userInfo,
                validPassWord: true,
                password
            });
        }

        else
        {
            setUserInfo({
                ...userInfo,
                validPassWord: false,
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

        if(validateForm())
        {
            return(
                true
            )
        }
    }

    const handleSubmit = (e) => {
        // console.log("handleSubmit: " + success);
        e.preventDefault();
        const signupRequest = {
            username: userInfo.nickname,
            email:userInfo.email,
            phonenumber: userInfo.phonenumber,
            password: userInfo.password,
        }
        axios.post('http://localhost:5000/api/auth/signup', signupRequest)        
        .then(res => {
            console.log('res');
            console.log(res);
            history.goBack();
        },(error) => {
            console.log(error);
        });
    }

    // useEffect(() => {
    //     if(emailConfirm === 'true'){
    //         const time = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    //         return () => clearInterval(time);
    //     }
    // }, [timer, emailConfirm])

    const emailClick = (e) => {        
        if(emailConfirm === 'false'){
            setEmailConfirm('true');
            checkEmailAvailability(userInfo.email)
            .then(res => {
                console.log('success');
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    return (
        <div className='signUpScreen'>
            <div className='signUpContainer'>
                <div className='signUpTitle'>Join KOSM</div>
                <div className='signUpTitle2'>Create your account</div>
                    <div style={{marginTop: '41px'}} className='signUpFormContainer'>
                        <div className='signUpSubTitle'>닉네임</div>
                        <input
                            onChange={e => {validateNickName(e.target.value)}}
                            type='text'
                            name='nickname'
                            id='nickname'
                            className={ `form-control ${inputClassNameHelper(userInfo.nickname && userInfo.validNickName)}` }   
                            //원래 것 나머지 input은 디자인대로 바꿨음
                            placeholder='닉네임'/>
                    </div>
                    <div>
                        <div className='signUpFormContainer'>
                            <div className='signUpSubTitle'>이메일</div>
                            <div style={{display:'flex'}}>
                                <input
                                    onChange={e => {validateEmail(e.target.value)}}
                                    type='text'
                                    name='email'
                                    id='email'
                                    style={{width: '475px'}}
                                    className={ `signUpSubInput ${inputClassNameHelper(userInfo.email && userInfo.validEmail)}` }
                                    placeholder='example@example.com'
                                    aria-describedby="emailHelp"/>
                                <ButtonToggle 
                                    color='info'
                                    style={{ 
                                        marginLeft: '13px',
                                        width: '118px', 
                                        height: '60px',
                                        fontSize: '20px',
                                        fontFamily: 'NotoSans',
                                        fontWeight: '500',
                                        fontStretch: 'normal',
                                        fontStyle: 'normal',
                                        lineHeight: '1.35',
                                        letterSpacing: 'normal',
                                        textAlign: 'center',
                                        display:'inline-box'}}
                                    onClick={emailClick}>
                                        확인
                                </ButtonToggle>
                            </div>
                        </div>
                    </div>
                    <div 
                        style={{
                            display: 'flex', 
                            justifyContent: 'flex-end',
                            marginTop: '8px'}}>
                        <div style={{display: 'flex'}}>
                            <div style={{
                                display: 'flex',
                                width: '137px',
                                height: '50px',
                                alignItems:'center',
                                verticalAlign:'center',
                                fontFamily: 'NotoSans',
                                fontSize: '20px',
                                fontWeight: '500',
                                fontStretch: 'normal',
                                fontStyle: 'normal',
                                lineHeight: '1.35',
                                letterSpacing: 'normal',
                                color: '#eaeaea'}}>
                                인증코드 입력
                            </div>
                            <input
                                type='text'
                                name='code'
                                id='code'
                                className='form-control'
                                style={{
                                    width: '270px', 
                                    height: '50px',
                                    background: '#eaeaea',
                                    marginLeft:'15px'}}
                                placeholder='123456'/>
                            <ButtonToggle              
                                color='info'
                                style={{ 
                                    marginLeft:'13px',
                                    fontSize: '13px',
                                    width: '118px',
                                    height: '50px', 
                                    fontFamily: 'NotoSans',
                                    fontSize: '20px',
                                    fontWeight: '500',
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: '1.35',
                                    letterSpacing: 'normal',
                                    color: '#ffffff',
                                    display:'inline-box'}}>
                                    인증
                            </ButtonToggle>
                        </div>
                    </div>
                    <div style={{marginTop: '14px'}} className='signUpFormContainer'>
                        <div className='signUpSubTitle'>비밀번호 (영문+숫자, 6~20자)</div>
                        <input
                            onChange={e => {validatePassWord(e.target.value)}}
                            type='password'
                            name='password'
                            id='password'
                            className={ `signUpSubInput ${inputClassNameHelper(userInfo.password && userInfo.validPassWord)}`}/>
                    </div>                 
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>비밀번호 확인</div>
                        <input
                            onChange={e => {validateConfirmPassWord(e.target.value)}}
                            type='password'
                            name='confirm-password'
                            id='confirm-password'
                            className={ `signUpSubInput ${inputClassNameHelper(userInfo.confirmpassword && userInfo.validConfirmPassWord)}` }/>
                    </div>                 
                    { /*<button type='submit' className='btn btn-success'>버튼</button>*/ }
                    <div style={{width: '100%', marginTop: '73px'}}>
                        <div style={{display:'flex', justifyContent:'center'}}>
                        {
                            renderSubmitBtn() ?
                            <button 
                                className='btn btn-success'
                                onClick={handleSubmit}>
                                회원가입
                            </button>:
                            <DefaultButton/>
                        }
                        </div>
                    </div>
            </div>
        </div>
    )
}

const DefaultButton = () => {
    return (
        <ButtonToggle 
            color='info'
            style={{
                pointerEvents:'none', 
                cursor: 'default',
                width: '100%',
            }} 
            type="submit">
            회원가입
        </ButtonToggle>
    )
}

export default SignUp;