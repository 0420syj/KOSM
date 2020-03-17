import React from 'react';
import axios from 'axios';
import BeforeMenu from '../menu/before/BeforeMenu';
import {signok} from '../util/APIUtils';
const Success = ({match}) => {
    const signupRequest = {
        hash: match.params.id
    }
    signok(signupRequest)
    .then(res => {
        console.log(res.body);
        alert((localStorage.getItem("auth_email")));
},(error) => {
    console.log(error);
    console.log(signupRequest.hash);
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
