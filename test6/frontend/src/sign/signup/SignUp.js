import React from 'react';
import SignUpForm from './SignUpForm';
import BeforeMenu from '../../menu/before/BeforeMenu';
import Footer from '../../menu/Footer';
import './SignUp.scss'


const SignUp = () => {
    return ( 
        <div className="container">
            <div className="top">
                <BeforeMenu />
            </div>
            {/* <div className="left">
                <SourceList />
            </div> */}
            <div className="signup-content">
                <SignUpForm/>
            </div>
            <div className="signup-bottom">
                <Footer/>
            </div>
        </div>
        // <div>
        //     <BeforeMenu/>
        //     <SignUpForm/>
        // </div>
    )
}

export default SignUp;