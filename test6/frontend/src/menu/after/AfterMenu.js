import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import './AfterLogin.scss';
const AfterMenu = (props) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const logoutClick = () => {
        localStorage.setItem('isLogin', 'false');
        localStorage.setItem('email', '');
        localStorage.setItem('username', '');
        localStorage.setItem('password', '');
        localStorage.setItem('phonenumber', '');
    }
    
    const toggle = () => {
        setIsDropdown(!isDropdown);
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
                        <div>
                            <Dropdown isOpen = {isDropdown} toggle={toggle}>
                                <DropdownToggle>
                                    {localStorage.getItem('username')}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to='/' style={{color: 'inherit', textDecoration:'none'}}>
                                            <div style={{cursor: 'pointer'}} onClick ={logoutClick}>Logout</div>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to='/mypage' style={{color: 'inherit', textDecoration:'none'}}>
                                            <div style={{cursor: 'pointer'}}>My Page</div>
                                        </Link> 
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AfterMenu;