import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './MyData.scss';
import {Button} from 'reactstrap';
import { changeName } from '../util/APIUtils';
const MyData = () => {
    const [userInfo, setUserInfo] = useState({
        email:sessionStorage.getItem('email'),
        username:'',
    })

    const onChange= (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
        //console.log(userInfo)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // alert('email : ' + userInfo.email + '\nusername : ' + userInfo.username);
        changeName(userInfo)
        .then(() => {
            alert("닉네임이 변경되었습니다 : " + userInfo.username)
            // console.log(userInfo.username);
            sessionStorage.setItem('username', userInfo.username); // sessionStorage 값 수정
            window.location.href = '/';
            }).catch((error) => {
                alert("변경 실패")
                console.log(error)
            });
        };
    return ( 
        <div className='dataContainer'>
            <div className='dataTitle'>Join KOSM</div>
            <div className='dataTitle2'>Personal setting</div>
            <form onSubmit={onSubmit}>
            <div className='sub' style={{marginTop: '28px'}}>
                <div className='subTitle'>이메일</div>
                <input 
                    type='text' 
                    style={{width: '100%'}}
                    className='input'
                    onChange={onChange}
                    name='username'
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
                    onChange={onChange}
                    name="username"
                    style={{width: '100%'}}/>
            </div>            
            <div className='buttonContainer'>
                <Button className='button'>
                    정보변경
                </Button>
            </div>
            <div className='bottomText'>
                <div className='text1'>KOSM을 더 이상 이용하지 않는다면?</div>
                <Link to='/deleteuser'>
                    <div className='text2'> &nbsp; &nbsp;>KOSM탈퇴 바로가기</div>
                </Link>
            </div>
            </form>
        </div>
    )
}

export default MyData;