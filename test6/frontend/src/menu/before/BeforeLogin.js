import React, {useState} from 'react';
import SourceList from '../SourceList';
import Description from './Description';
import Login from '../../sign/login/Login'
import './BeforeLogin.scss';
import BeforeMenu from './BeforeMenu';

const BeforeLogin = (props) => {
    console.log('BeforeLogin');
    return ( 
        <div>
            <div>
                <BeforeMenu/>
            </div>
            <div style={{display: 'flex'}}>
                <div><SourceList/></div>
                <div><Description/></div>
                <div><Login user={props.user} setUser={props.setUser}/></div>
            </div>
        </div>
    )
}

export default BeforeLogin;