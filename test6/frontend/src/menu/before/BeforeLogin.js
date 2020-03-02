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
            <div className="left">
                <SourceList />
            </div>
            <div className="description-content">
                <Description />
            </div>
            <div className="bottom">
                Footer
            </div>
        </div>
    )
}

export default BeforeLogin;
