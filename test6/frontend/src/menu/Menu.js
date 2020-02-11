import React, {useEffect, useState} from 'react';
import './Menu.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';

import ToggleText from './ToggleText'

const Menu = props => {
    const [user, setUser] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {        
        const fetchData = async() => {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    return response.json()
                }).then(json => {
                    setUser(JSON.parse(JSON.stringify(json)));
                    setLoading(false);
            })
        };
        fetchData();
    }, []);

    return (
        <div className='menuContainer'>
            <div className='container'>
                <div>
                    <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
                        <div style={{cursor: 'pointer'}}>Home</div>
                    </Link>
                </div>
                <div className='rightContainer'>
                    <Link to='/board' style={{color: 'inherit', textDecoration: 'none'}}>
                        <div style={{cursor: 'pointer'}}>게시판</div>
                    </Link>
                    <Link to='/signup' style={{color:'inherit', textDecoration: 'none'}}>
                        <div style={{cursor: 'pointer'}}>회원가입</div>
                    </Link>
                    <Link to='/login' style={{color: 'inherit', textDecoration:'none'}}>
                        <div style={{cursor: 'pointer'}}>로그인</div>
                    </Link>
                </div>
            </div>
            <div>
                {isLoading ? <div>Loading...</div> : <div></div>}
                {isLoading ? <div></div> : <div>
                    <ul>{user.map((item) => {
                            return <li key={item.id}>
                                <div className='listContainer'>{item.title}&nbsp;</div>
                                <ToggleText />
                                </li>
                        })}
                    </ul></div>}
            </div>
        </div>
    )
}

export default Menu;