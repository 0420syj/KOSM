import React, {useState} from 'react';
import './SignUp.scss';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import { OmitProps } from 'antd/lib/transfer/renderListBody';
// import { Form, Input, Button, Icon, notification } from 'antd';


const SignUp = ({match}) => {
    const history = useHistory();
    // const [success, setSuccess] = useState(false);
    
    const [userInfo, setUserInfo] = useState({
            'nickname': '',
            validNickName: false,
            'email':'',
            validEmail: false,
            'phonenumber':'',
            validPhoneNumber: false,
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
    
    const validatePhoneNumber = phonenumber => {
        // 010-0000-0000 형식
        const phoneNumberRegExp = /^\d{3}-\d{3,4}-\d{4}$/;
        
        if(phonenumber.match(phoneNumberRegExp))
        {
            setUserInfo({
                ...userInfo,
                validPhoneNumber: true,
                phonenumber
            });
        }

        else
        {
            setUserInfo({
                ...userInfo,
                validPhoneNumber: false,
                phonenumber
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
                && userInfo.validPhoneNumber
                && userInfo.validPassWord
                && userInfo.validConfirmPassWord;
        }

        if(validateForm())
        {
            return(
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                    회원가입
                </button>
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
            history.goBack();
        },(error) => {
            console.log(error);
        });
    }

    const emailCheck = (email) => {
    }
    
    const emailClick = () => {        
        console.log(localStorage.getItem('king6096211@naver.com'));
        checkUsernameAvailability('kang')
        .then(res => {
            console.log('success');
        })
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <div className='signUpScreen'>
            <div className='signUpContainer'>
                <div className='signUpTitle'>회원가입</div>
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>Nickname (3~8자)</div>
                        <input
                            onChange={e => {validateNickName(e.target.value)}}
                            type='text'
                            name='nickname'
                            id='nickname'
                            className={ `form-control ${inputClassNameHelper(userInfo.nickname && userInfo.validNickName)}` }
                            placeholder='닉네임'/>
                    </div>
                    <div>
                        <div className='signUpFormContainer'>
                            <div className='signUpSubTitle'>Email</div>
                            <div style={{display:'flex'}}>
                                <input
                                    onChange={e => {validateEmail(e.target.value)}}
                                    type='text'
                                    name='email'
                                    id='email'
                                    className={ `form-control ${inputClassNameHelper(userInfo.email && userInfo.validEmail)}` }
                                    placeholder='example@example.com'
                                    aria-describedby="emailHelp"/>
                                <button 
                                    style={{ 
                                        marginLeft: '5%',
                                        width: '30%', 
                                        fontSize: '80%', 
                                        display:'inline-box',
                                    }}                                        
                                    onClick={emailClick}>중복 확인</button>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex'}}>
                        <div style={{marginRight:'5%'}}>Code</div>
                        <input
                            // onChange={onChange} 불필요
                            type='text'
                            name='code'
                            id='code'
                            className='form-control'
                            placeholder='123456'
                        />
                        <button style={{marginLeft:'5%'}}>Confirm</button>
                    </div>

                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>Phone Number</div>
                        <input
                            onChange={e => {validatePhoneNumber(e.target.value)}}
                            type='text'
                            name='phonenumber'
                            id='phonenumber'
                            className={ `form-control ${inputClassNameHelper(userInfo.phonenumber && userInfo.validPhoneNumber)}` }
                            placeholder='010-1234-1234'
                        />
                    </div>
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>Password (영문+숫자, 6~20자)</div>
                        <input
                            onChange={e => {validatePassWord(e.target.value)}}
                            type='password'
                            name='password'
                            id='password'
                            className={ `form-control ${inputClassNameHelper(userInfo.password && userInfo.validPassWord)}` }
                        />
                    </div>                 
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>Confirm Password</div>
                        <input
                            onChange={e => {validateConfirmPassWord(e.target.value)}}
                            type='password'
                            name='confirm-password'
                            id='confirm-password'
                            className={ `form-control ${inputClassNameHelper(userInfo.confirmpassword && userInfo.validConfirmPassWord)}` }
                        />
                    </div>                 
                    { /*<button type='submit' className='btn btn-success'>버튼</button>*/ }
                    {renderSubmitBtn()}
            </div>
        </div>
    )
}

export default SignUp;
