import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './ForgotPassword.scss';
import { forgot } from '../../../util/APIUtils';
import axios from 'axios';
const ForgotPassword = () => {
    const [isConfirm, setIsConfirm] = useState(false);
    const [data, setData] = useState({
        email: '',
        originPassword: '',      //기존 비밀번호
        password: '',            //새 비밀번호 
        confirmPassword: '',    //비밀번호 확인
    })
    const confirm = (e) => {
        e.preventDefault();
         const userinfo = { 
             email:data.email
         }    
         forgot(userinfo)        
         .then(res => {
             alert(res);       
    }).catch(e => {
        alert('Fuck');
        console.log(e);
    })
    }
    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const changeSuccess = () => {
        alert('비밀번호를 변경하였습니다.');
    }

    return ( 
        <div className='forgotContainer'>
            <div className='container2'>
                <div className='title'>Join KOSM</div>
                <div className='title2'>Forgot Password</div>
                <form type='submit'>
                    <div className='contents'>
                        <div className='in'>
                            <div style={{marginBottom: '20px'}} className='inContents'>
                                <div className='subTitle'>이메일</div>
                                <div className='email'>
                                    <input type='email' name='email' value={data.email} onChange = {onChange} className='subInput'/>
                                    {
                                        isConfirm === true ?
                                        <button style={{
                                            background: '#00ff00',
                                            width: '80px',
                                            marginLeft: '10px',
                                            borderRadius: '10px',
                                            color: '#ffffff',
                                            fontWeight: '500',
                                            fontSize: '20px',
                                        }}>
                                            확인
                                        </button>:
                                        <button 
                                            style={{
                                                background: '#3aada8',
                                                width: '80px',
                                                marginLeft: '10px',
                                                borderRadius: '10px',
                                                color: '#ffffff',
                                                fontWeight: '500',
                                                fontSize: '20px',
                                            }} onClick={confirm}>인증</button>
                                    }
                                </div>
                            </div>
                          
                           
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;