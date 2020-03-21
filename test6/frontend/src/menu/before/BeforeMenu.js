import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styled from 'styled-components';
import './BeforeMenu.scss';
import { WIDTH, HEIGHT } from '../../constants';

const BeforeMenu = () => {
    const [isDropdown, setIsDropdown] = useState(false);
    const toggle = () => {
        setIsDropdown(prev => !prev);
    }

    return (
        <div className="top-container">
            <div className="logo">
                <Link to='/'>
                    KOSM
                </Link>
            </div>
            <div className="menu"
                style={{
                    marginRight: '50px',
                    width: '190px',
                    minWidth: '190px',}}>
                <Link to='/board'>
                    <span>게시판</span>
                </Link>
                <Dropdown 
                    className='dropdown'
                    isOpen={isDropdown}
                    toggle={toggle}>
                    <DropdownToggle right style={{padding: '0px', background: '#414141', border: 'none'}}>
                    로그인
                    </DropdownToggle>
                    <DropdownMenu className='dropdownMenu' style={{transform: 'translate(-35px, 0px)'}}>
                        <DropdownItem className='dropdownItem'>
                            <Link to='/login' className='link'>
                                Login
                            </Link>
                        </DropdownItem>
                        {/* <DropdownItem divider /> */}
                        <DropdownItem className='dropdownItem'>
                            <Link to='/signup' className='link'>
                                Sign Up
                            </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}

export default BeforeMenu;