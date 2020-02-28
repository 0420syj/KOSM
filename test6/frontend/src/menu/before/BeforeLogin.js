import React from 'react';
import SourceList from '../SourceList';
import Description from './Description';
import BeforeMenu from './BeforeMenu';
import './BeforeLogin.scss';

const BeforeLogin = (props) => {
    return (
        <div className="container">
            <div className="top">
                <BeforeMenu />
            </div>
            <div clasName="left">
                <SourceList />
            </div>
            <div className="content">
                <Description />
            </div>
            {/* <div><Login user={props.user} setUser={props.setUser}/></div> */}
        </div>
    )
}

export default BeforeLogin;
