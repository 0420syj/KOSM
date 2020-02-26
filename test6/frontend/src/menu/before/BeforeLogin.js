import React from 'react';
import SourceList from '../SourceList';
import Description from './Description';
import BeforeMenu from './BeforeMenu';

const BeforeLogin = (props) => {
    return ( 
        <div>
            <div style={{width: '100%'}}>
                <BeforeMenu/>
            </div>
            <div style={{display: 'flex'}}>
                <div>
                    <SourceList/>
                </div>
                <div><Description/></div>
                {/* <div><Login user={props.user} setUser={props.setUser}/></div> */}
            </div>
        </div>
    )
}

export default BeforeLogin;