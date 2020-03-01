import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ButtonToggle, Button} from 'reactstrap';
import './MyData.scss';
const MyData = () => {
    const [changePassword, setPassword] = useState(false);
    console.log(localStorage.getItem('email'));
    return ( 
        <div className='dataContainer'>
            <div className='dataTitle'>Join KOSM</div>
            <div className='dataTitle2'>Personal setting</div>
            <div className='sub' style={{marginTop: '28px'}}>
                <div className='subTitle'>이메일</div>
                <input 
                    readOnly 
                    type='text' 
                    style={{width: '100%'}}
                    className='input'
                    style={{background: '#414141', fontSize: '25px'}}
                    placeholder={`  ${localStorage.getItem('email')}`}/>
            </div>
            <div className='sub'>
                <div className='subTitle'>닉네임</div>
                <input 
                    type='text'
                    className='input'
                    style={{width: '100%'}}/>
            </div>
            <div className='sub'>
                <div className='subTitle'>기존 비밀번호</div>
                <input 
                    type='password'
                    className='input'
                    style={{width: '100%'}}/>
            </div>
            <div className='sub'>
                <div
                    className='subTitle' 
                    style={{display: 'flex', marginTop: '21px'}}>
                    <div className='newPassword'>새 비밀번호</div>
                    <div>&nbsp;</div>
                    <Link to='/changepwd'>
                        <div className='changePassword'>비밀번호 변경</div>
                    </Link>
                </div>
                <input 
                    type='password'
                    className='input'
                    style={{width: '100%'}}/>
            </div>            
            <div className='sub'>
                <div className='subTitle'>비밀번호 확인</div>
                <input 
                    className='input'
                    type='password'
                    style={{width: '100%'}}/>
            </div>
            <div className='buttonContainer'>
                <ButtonToggle className='button'>
                    정보변경
                </ButtonToggle>
            </div>
            <div className='bottomText'>
                <div className='text1'>KOSM을 더 이상 이용하지 않는다면?</div>
                <Link to='/deleteuser'>
                    <div className='text2'> &nbsp; &nbsp;>KOSM탈퇴 바로가기</div>
                </Link>
            </div>
        </div>
    )
}

export default MyData;