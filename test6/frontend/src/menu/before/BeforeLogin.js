import React, {memo} from 'react';
import SourceList from '../SourceList';
import Description from './Description';
import BeforeMenu from './BeforeMenu';
import Footer from '../Footer';
import './BeforeLogin.scss';

const BeforeLogin = memo(() => {
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
                <Footer/>
            </div>
        </div>
    )
})

export default BeforeLogin;
