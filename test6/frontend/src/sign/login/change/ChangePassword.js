import React, {useState} from 'react';
//import {Button} from 'reactstrap';
import { changePassword } from '../../../util/APIUtils';
import './ChangePassword.scss';
const ChangePassword = () => {
    
    const [userInfo, setUserInfo] = useState({
        'prevpassword': '',
        'password': '',
        validPassWord: false,
        'confirmpassword': '',
        validConfirmPassWord: false,
    });

    const onChange= (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
        console.log(userInfo)
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

        console.log(userInfo)
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

        console.log(userInfo)
    }

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

    const renderSubmitBtn = () => {
        // 폼 안의 모든 값이 유효한지 검사
        const validateForm = () => {
            return userInfo.validPassWord
                && userInfo.validConfirmPassWord;
        }

        const validateDiffPassword = () => {
            return (userInfo.prevpassword !== userInfo.password) && (userInfo.prevpassword !== userInfo.confirmpassword);
        }

        if(validateForm() && validateDiffPassword())
        {
            return(
                true
            )
        }

        else return false
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const request = {
            email : localStorage.getItem('email'),
            beforePassword : userInfo.prevpassword,
            newPassword : userInfo.password
        }
        alert('email : ' + request.email + '\nbeforPassword : ' + request.beforePassword + '\nnewPassword : ' + request.newPassword)
        changePassword(request)       
        .then(() => {
            alert("변경 성공");
            window.location.href = '/';
        },(error) => {
            console.log(error);
            alert("변경 실패");
        });
    }
    
    return ( 
        <div className='changeContainer'>
            <div className='title'>
                <div className='title1'>Join KOSM</div>
                <div className='title2'>Change Password</div>
            </div>
            <div className='mainContents'>
                <form onSubmit={onSubmit}>
                <div className='contents'>
                    <div className='subContents'>
                        <div className='subTitles'>기존 비밀번호</div>
                        <div className='inputContents'>
                            <input 
                                onChange={onChange}
                                type="password"
                                className='inputs'
                                name='prevpassword'/>
                        </div>
                    </div>
                    <div style={{marginTop: '21px'}} className='subContents'>
                        <div className='subTitles'>새 비밀번호 (영문숫자 조합 6~20자)</div>
                        <div className='inputContents'>
                            <input 
                                onChange={e => {validatePassWord(e.target.value)}}
                                type="password"
                                className={ `form-control ${inputClassNameHelper(userInfo.password && userInfo.validPassWord)} inputs` }
                                name='password'/>
                        </div>
                    </div>
                    <div className='subContents'>
                        <div className='subTitles'>비밀번호 확인</div>
                        <div className='inputContents'>
                            <input 
                                onChange={e => {validateConfirmPassWord(e.target.value)}}
                                type="password"
                                className={ `form-control ${inputClassNameHelper(userInfo.confirmpassword && userInfo.validConfirmPassWord)} inputs` }
                                name='confirm-password'/>
                        </div>
                    </div>
                    {renderSubmitBtn() ? 
                        <button 
                            className='changeButton'>
                            비밀번호 변경
                        </button>
                        : <div className='changeButton'>네이노오오옴!</div>}
                </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;