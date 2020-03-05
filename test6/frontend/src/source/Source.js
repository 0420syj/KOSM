import React from 'react';
import SourceList from '../menu/SourceList';
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMainSource from './AfterMainSource';
import AfterMenu from '../menu/after/AfterMenu';
import './Source.scss';
const Source = ({match}) => {
    console.log('asds');
    console.log(sessionStorage.getItem('isLogin'));
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
                <AfterMainSource name={match.params.item}/>
                </div>
            <div className="bottom">
                Footer
            </div>
        </div>
    )
}

export default Source;