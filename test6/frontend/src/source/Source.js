import React from 'react';
import SourceList from '../menu/SourceList';
import Menu from '../menu/before/BeforeMenu';
import MainSource from './MainSource';
const Source = ({match}) => {
    return ( 
        <div>
            <div>
                <Menu/>
                <div style={{display:'flex'}}>
                    <SourceList />
                    <MainSource name={match.params.item}/>
                </div>
            </div>
        </div>
    )
}

export default Source;