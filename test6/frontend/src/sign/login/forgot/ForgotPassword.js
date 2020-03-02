import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './ForgotPassword.scss';
const ForgotPassword = () => {
    const [isConfirm, setIsConfirm] = useState(false);
    const [data, setData] = useState({
        email: '',
        originPassword: '',      //기존 비밀번호
        password: '',            //새 비밀번호 
        confirmPassword: '',    //비밀번호 확인
    })
    const confirm = () => {     //여기서 confirm을 바꿔주면 됨

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
                                    <input type='password' name='email' value={data.email} onChange = {onChange} className='subInput'/>
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
                            <div className='inContents'>
                                <div className='subTitle'>기존 비밀번호</div>
                                <input type='password' className='passwordInput' name='originPassword' onChange={onChange} value={data.originPassword}/>
                            </div>
                            <div className='inContents'>
                                <div className='subTitle'>새로운 비밀번호 입력</div>
                                <input type='password' name='password' value={data.password} onChange = {onChange} className='passwordInput'/>
                            </div>
                            <div className='inContents'>
                                <div className='subTitle'>비밀번호 확인</div>
                                <input type='password' name='confirmPassword' value={data.confirmPassword} onChange = {onChange} className='passwordInput'/>
                            </div>
                            <div style={{marginTop: '73px'}}>
                                {
                                    isConfirm && (data.password != '') && (data.password === data.confirmPassword) ?
                                    <Link to ='/'>
                                        <button onClick = {changeSuccess} className='changeSuccess'>비밀번호 변경</button>
                                    </Link> :
                                    <button className='changeFail'>비밀번호 변경</button>      
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;