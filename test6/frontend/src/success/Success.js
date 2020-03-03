import React from 'react';
import axios from 'axios';
import BeforeMenu from '../menu/before/BeforeMenu';
const Success = ({match}) => {
    console.log('asd');
    const signupRequest = {
        username: localStorage.getItem("username"),
        email:     localStorage.getItem("auth_email"),
        password: localStorage.getItem("auth_password"),
    }
    axios.post('http://localhost:5000/api/auth/signok', signupRequest)        
.then(res => {
    console.log('success');
    alert((localStorage.getItem("auth_email")));
    localStorage.setItem("auth_email","");
    localStorage.setItem("auth_password","");
    localStorage.setItem("username","");
},(error) => {
    console.log(error);
});
    return (  
        <div>       
            <BeforeMenu/>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <h1 style={{color: '#e4e4e4', marginTop: '50px'}}>
                    회원가입 해주셔서 감사합니다.
                </h1>
                
            </div>
        </div>
    )
}

export default Success;
