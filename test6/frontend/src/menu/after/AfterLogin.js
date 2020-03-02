import React from 'react';
import Favorite from './Favorite';
import SourceList from '../SourceList';
import AfterMenu from './AfterMenu';
import './AfterLogin.scss'

const AfterLogin = (props) => {
    return ( 
        <div className="container">
            <div className="top">
                <AfterMenu user={props.user}  setUser = {props.setUser}/>
            </div>
            <div className="left">
                <SourceList />
            </div>
            <div className="favorite-content">
                <Favorite/>
            </div>
            <div className="bottom">
                Footer
            </div>
        </div>
    )
}

export default AfterLogin;