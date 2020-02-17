import React from 'react';
import SourceList from '../menu/SourceList';
import BeforeMenu from '../menu/before/BeforeMenu';
import MainSource from './MainSource';
import AfterMenu from '../menu/after/AfterMenu';
const Source = ({match}) => {
    return ( 
        <div>
            <div>
                {
                    localStorage.getItem('isLogin') === 'false' ? 
                    <BeforeMenu/> :
                    <AfterMenu/>
                }
                <div style={{display:'flex'}}>
                    <SourceList />
                    <MainSource name={match.params.item}/>
                </div>
            </div>
        </div>
    )
}

export default Source;