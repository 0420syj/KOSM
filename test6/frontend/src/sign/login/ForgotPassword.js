import React from 'react';
const ForgotPassword = () => {
    return ( 
        <div style={{width: '100%'}}>
            <div style={{
                border: '1px solid #000000',
                width: '20%'}}>
                <div style={{justifyContent: 'center'}}>
                    <div>이메일을 입력하세요</div>
                    <input placeholder='example@example.com'/>
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', justifyContent:'center'}}>
                            <button>verify</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;