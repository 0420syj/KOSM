import React, {useState} from 'react';
import {Button} from 'reactstrap';
import { changePassword } from '../../../util/APIUtils';
import './ChangePassword.scss';
import { useHistory } from "react-router-dom";

const ChangePassword = () => {

    let history = useHistory();
    
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
        //console.log(userInfo)
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

        // console.log(userInfo)
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
            });
        }

        // console.log(userInfo)
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
            email : sessionStorage.getItem('email'),
            beforePassword : userInfo.prevpassword,
            newPassword : userInfo.password
        }
        changePassword(request)       
        .then(() => {
            alert("비밀번호가 변경되었습니다.");
            history.push('/')
        },(error) => {
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
                <div className='chagepwd-contents'>
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
                        <Button 
                            className='changeButton'>
                            비밀번호 변경
                        </Button>
                        : <Button className='changeButton-disable' disabled="disabled">비밀번호 변경</Button>}
                </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;