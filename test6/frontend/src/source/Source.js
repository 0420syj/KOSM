/*
    왼쪽 리스트를 눌렀을 때 나오는 페이지 첫 화면
*/

import React from 'react';
import SourceList from '../menu/SourceList';
import BeforeMenu from '../menu/before/BeforeMenu';
import MainSource from './main_code/MainSource';
import AfterMenu from '../menu/after/AfterMenu';
import './Source.scss';
import Footer from '../menu/Footer'

const Source = ({match}) => {
    return (
        <div className="container">
            <div className="top">
                {
                    sessionStorage.getItem('isLogin') === 'false' ? 
                    <BeforeMenu/> :
                    <AfterMenu/>
                }
            </div>
            <div className="left">
                <SourceList />
            </div>
            <div className="source">
                <MainSource name={match.params.item}/>
                </div>
            <div className="bottom">
                <Footer/>
            </div>
        </div>
    )
}

export default Source;