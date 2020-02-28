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
            <div className="logo"
                style={{
                    paddingLeft: `${WIDTH * 48}px`,
                    paddingTop: `${WIDTH * 14}px`,
                }}>
                <Link to='/'>
                    KOSM
                </Link>
            </div>
            <div className="menu"
                style={{
                    width: `${WIDTH * 124 + 120}px`,
                    marginRight: `${WIDTH * 87.2}px`,
                    marginTop: `${WIDTH * 35.5}px`,
                }}>
                <Link to='/board'>
                    게시판
                </Link>
                <Dropdown 
                    className='dropdown'
                    isOpen={isDropdown}
                    toggle={toggle}
                    >
                    <DropdownToggle style={{
                        boxShadow: 'none',
                        background: '#414141',
                        border: 'none',
                        width: '100%',
                        height: '100%'
                    }}>
                    로그인
                    </DropdownToggle>
                    <DropdownMenu className='dropdownMenu'>
                        <DropdownItem className='dropdownItem'>
                            <Link to='/login'
                                style={{
                                    textDecorataion: 'none',
                                    color: '#e4e4e4',
                                    width: '100%',
                                    textAlign: 'center'
                                }}>
                                Login
                            </Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className='dropdownItem'>
                            <Link to='/signup'
                                style={{
                                    textDecorataion: 'none',
                                    color: '#e4e4e4',
                                    width: '100%',
                                    textAlign: 'center'
                                }}>
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