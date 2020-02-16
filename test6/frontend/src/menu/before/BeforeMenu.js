import React from 'react';
import {Link} from 'react-router-dom';
import './BeforeLogin.scss';
const BeforeMenu = () => {
    return ( 
        <div>
            <div className='menuContainer'>
                <div className='container'>
                    <div className='leftContainer'>
                        <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
                            <div style={{cursor: 'pointer'}}>Home</div>
                        </Link>
                    </div>
                    <div style={{display: 'flex', justifyContent:'space-between', width: '100%'}}>
                        <Link to='/board' style={{color: 'inherit', textDecoration: 'none'}}>
                            <div style={{cursor: 'pointer'}}>Board</div>
                        </Link>
                        <Link to='/signup' style={{color: 'inherit', textDecoration:'none'}}>
                            <div style={{cursor: 'pointer'}}>Sign Up</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeforeMenu;