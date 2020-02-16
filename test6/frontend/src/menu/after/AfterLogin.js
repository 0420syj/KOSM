import React from 'react';
import Favorite from './Favorite';
import SourceList from '../SourceList';
import AfterMenu from './AfterMenu';
const AfterLogin = (props) => {
    console.log('AfterLogin');
    console.log(props);
    return ( 
        <div>
            <AfterMenu user={props.user}  setUser = {props.setUser}/>
            <div style={{display: 'flex'}}>
                <SourceList/>
                <Favorite/>
            </div>
        </div>
    )
}

export default AfterLogin;