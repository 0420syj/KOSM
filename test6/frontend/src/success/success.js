import React from 'react';
import Home from '../home/Home';
import axios from 'axios';

const success = () => {
    const signupRequest = {
        username: localStorage.getItem("username"),
        email:     localStorage.getItem("auth_email"),
        password: localStorage.getItem("auth_password"),
    }
    alert((localStorage.getItem("auth_email")));
    alert((localStorage.getItem("auth_password")));
    axios.post('http://localhost:5000/api/auth/signok', signupRequest)        
.then(res => {
    console.log('success');
    alert((localStorage.getItem("auth_email")));
    localStorage.setItem("auth_email","");
    localStorage.setItem("auth_password","");
    localStorage.setItem("username","");
},(error) => {
    console.log(error);
    alert("fuck");
});
    return (  
        <div>            
            onClick={success}>
            <Home/>
        </div>
    )
}

export default success;