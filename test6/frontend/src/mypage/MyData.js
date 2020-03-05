import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ButtonToggle, Button} from 'reactstrap';
import './MyData.scss';
const MyData = () => {
    const [changePassword, setPassword] = useState(false);
    console.log(sessionStorage.getItem('email'));
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
                    placeholder={`${sessionStorage.getItem('email')}`}/>
            </div>
            <div className='sub'>
                <div
                    className='subTitle' 
                    style={{display: 'flex', marginTop: '21px'}}>
                    <div className='newPassword'>닉네임</div>
                    <div>&nbsp;</div>
                    <Link to='/changepwd'>
                        <div className='changePassword'>비밀번호 변경</div>
                    </Link>
                </div>
                <input 
                    className='input'
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