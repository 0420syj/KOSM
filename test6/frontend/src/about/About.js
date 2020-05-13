import React, { useState, useEffect } from 'react';
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import SourceList from '../menu/SourceList';
import Footer from '../menu/Footer'
import { Button, Badge } from 'reactstrap';
import './About.scss';

const About = () => {

    const renderTopMenu = () => {
        if (sessionStorage.getItem('isLogin') !== 'false')
            return <AfterMenu />
        else
            return <BeforeMenu />
    };

    return (
        <div className="container">
            <div className="top">
                {renderTopMenu()}
            </div>
            {/* <div className="left">
                <SourceList />
            </div> */}
            <div className="about">
                <div className='about-container'>
                    <div className='about-kosm'>
                        <div className='title'>KOSM</div>
                        <div className='content'>강파고 클라스ㅋ</div>
                    </div>
                    <div className='about-us'>
                        <div className='title'>만든 사람들</div>
                        <div className='content'>강태완, 백근우, 손창환, 심완, 김예원, 허채원</div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <Footer/>
            </div>
        </div>
    )
}

export default About;
