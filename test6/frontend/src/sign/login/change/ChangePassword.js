import React from 'react';
import './ChangePassword.scss';
const ChangePassword = () => {
    return ( 
        <div className='changeContainer'>
            <div className='title'>
                <div className='title1'>Join KOSM</div>
                <div className='title2'>Change Password</div>
            </div>
            <div className='mainContents'>
                <div className='contents'>
                    <div className='subContents'>
                        <div className='subTitles'>기존 비밀번호</div>
                        <div className='inputContents'>
                            <input className='inputs'/>
                        </div>
                    </div>
                    <div style={{marginTop: '21px'}} className='subContents'>
                        <div className='subTitles'>새 비밀번호</div>
                        <div className='inputContents'>
                            <input className='inputs'/>
                        </div>
                    </div>
                    <div className='subContents'>
                        <div className='subTitles'>비밀번호 확인</div>
                        <div className='inputContents'>
                            <input className='inputs'/>
                        </div>
                    </div>                
                    <button className='changeButton'>비밀번호 변경</button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;