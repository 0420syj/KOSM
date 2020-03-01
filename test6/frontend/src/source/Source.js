import React from 'react';
import SourceList from '../menu/SourceList';
import BeforeMenu from '../menu/before/BeforeMenu';
import MainSource from './MainSource';
import AfterMenu from '../menu/after/AfterMenu';
import './Source.scss';

const Source = ({match}) => {
    return (
        <div className="container">
            <div className="top">
                {
                    localStorage.getItem('isLogin') === 'false' ? 
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
                Footer
            </div>
        </div>
    )
}

export default Source;