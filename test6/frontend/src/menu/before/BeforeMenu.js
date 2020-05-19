import React, { useState, memo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './BeforeMenu.scss';

const BeforeMenu = memo(() => {
    const [isDropdown, setIsDropdown] = useState(false);
    const toggle = () => {
        setIsDropdown(prev => !prev);
    }

    const history = useHistory();

    return (
        <div className="top-container">
            <div className="logo">
                <Link to='/'>
                    KOSM
                </Link>
            </div>
            <div className="beforeMenu" style={{marginRight:'50px'}}>
                <Link to='/about'>
                    <span>소개</span>
                </Link>
                <Link to='/board'>
                    <span>게시판</span>
                </Link>
                <Dropdown 
                    className='dropdown'
                    isOpen={isDropdown}
                    toggle={toggle}>
                    <DropdownToggle
                        className="login-button">
                    로그인
                    </DropdownToggle>
                    <DropdownMenu className='dropdownMenu'>
                        <DropdownItem className='dropdownItem' onClick={() => {history.push('/login')}}>
                            Login
                        </DropdownItem>
                        <DropdownItem className='dropdownItem' onClick={() => {history.push('/signup')}}>
                            Sign Up
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
})

export default BeforeMenu;