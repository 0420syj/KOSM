import React from 'react';
import {Link} from 'react-router-dom';
const BeforeMenu = () => {
    return ( 
        <div style={{
            width: '100%',
            background: '#000000',
            height: '80px'}}>
            <div style={{
                    width: '100%',
                    color: '#FFFFFF',
                    height: '100%'}}>
                <div style={{
                    display: 'flex',
                    justifyContent:'space-between',
                    padding: '0% 2% 0% 2%',
                    height: '100%',
                    alignItems: 'center'}}>
                    <div style={{width: '80%'}}>
                        <Link to='/' style={{
                            color: 'inherit', 
                            textDecoration: 'none'}}>
                            <div style={{cursor: 'pointer'}}>KOSM</div>
                        </Link>
                    </div>
                    <div style={{width: '15%'}}>
                        <div style={{
                            display: 'flex', 
                            justifyContent:'space-between', 
                            width: '100%'}}>
                            <Link to='/board' style={{
                                color: 'inherit', 
                                textDecoration: 'none'}}>
                                <div style={{cursor: 'pointer'}}>Board</div>
                            </Link>

                            <div className='dropdown'>
                                <button className='dropbtn'>Login</button>
                                <div className='dropdown-content'>
                                    <Link to='/signup'>
                                        <div>회원가입</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeforeMenu;