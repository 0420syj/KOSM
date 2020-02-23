import React from 'react';
import {Link} from 'react-router-dom';
import './AfterLogin.scss';
const AfterMenu = (props) => {
    const logoutClick = () => {
        localStorage.setItem('isLogin', 'false');
        localStorage.setItem('email', '');
        localStorage.setItem('username', '');
        localStorage.setItem('password', '');
        localStorage.setItem('phonenumber', '');
    }
    
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
                        <div>{localStorage.getItem('username')}</div>

                        {/* <Link to='/' style={{color: 'inherit', textDecoration:'none'}}>
                            <div style={{cursor: 'pointer'}} onClick ={logoutClick}>Logout</div>
                        </Link>
                        <Link to='/mypage' style={{color: 'inherit', textDecoration:'none'}}>
                            <div style={{cursor: 'pointer'}}>My Page</div>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AfterMenu;