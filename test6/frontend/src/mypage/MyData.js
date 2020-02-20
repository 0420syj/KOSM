import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ButtonToggle, Button} from 'reactstrap';
const MyData = () => {
    const [changePassword, setPassword] = useState(false);
    console.log(localStorage.getItem('email'));
    return ( 
        <div>
            <div 
                style={{
                    display: 'flex', 
                    justifyContent:'center'}}>
                Join KOSM
            </div>
            <div 
                style={{
                    display: 'flex', 
                    justifyContent:'center'}}>
                Personal setting
            </div>
            <div>
                <div>이메일</div>
                <input 
                    readOnly 
                    type='text' 
                    style={{width: '100%'}}
                    placeholder={localStorage.getItem('email')}/>
            </div>
            <div>
                <div>닉네임</div>
                <input 
                    type='text'
                    style={{width: '100%'}}/>
            </div>
            <div>
                <div>기존 비밀번호</div>
                <input 
                    type='password'
                    style={{width: '100%'}}/>
            </div>
            <div>
                <div style={{display: 'flex'}}>
                    <div>새 비밀번호</div>
                    <div>&nbsp;</div>
                    <div>비밀번호 변경</div>
                </div>
                <input 
                    type='password'
                    style={{width: '100%'}}/>
            </div>            
            <div>
                <div>비밀번호 확인</div>
                <input 
                    type='password'
                    style={{width: '100%'}}/>
            </div>
            <ButtonToggle 
            color='info'
                style={{
                    width: '100%'
                }}>
                정보변경
            </ButtonToggle>
            <div style={{display: 'flex'}}>
                <div>KOSM을 더 이상 이용하지 않는다면?</div>
                <Link to='/deleteuser'>
                    <div> &nbsp; &nbsp;>KOSM탈퇴 바로가기</div>
                </Link>
            </div>
        </div>
    )
}

export default MyData;