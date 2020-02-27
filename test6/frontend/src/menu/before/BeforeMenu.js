import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import styled from 'styled-components';
import './BeforeMenu.scss';
import {WIDTH, HEIGHT} from '../../constants';

const BeforeMenu = () => {
    const [isDropdown, setIsDropdown] = useState(false);
    const toggle = () => {
        setIsDropdown(prev => !prev);
    }
    
    return ( 
        <div className='container'>
            <div style={{display: 'flex', height: '80px', justifyContent: 'space-between'}}>
                <div 
                    style={{
                        paddingLeft: `${WIDTH * 48}px`,
                        paddingTop: `${WIDTH * 14}px`,
                        width: '86px',
                        height: '53px'
                    }}>
                    <Link to='/' 
                        style={{
                            textDecoration: 'none',
                        }}>
                        <div
                            style={{
                                fontStretch: 'normal',
                                fontStyle:'normal',
                                lineHeight: '1.13',
                                letterSpacing: 'normal',
                                fontWeight: '500',
                                textAlign: 'left',
                                color: '#3aada8',
                                maxHeight:'53px',
                                fontSize: '47px',
                                fontFamily: 'FranklinGothic',
                                width: '86px',
                                height: '53px'
                            }}>
                            KOSM
                        </div>
                    </Link>
                </div>
                <div style={{
                    width: `${WIDTH * 124 + 120}px`,
                    height: '27px',
                    marginRight: `${WIDTH * 87.2}px`,
                    marginTop: `${WIDTH * 35.5}px`,                        
                    alignItems:'center',
                    justifyContent: 'space-between',
                    display: 'flex',}}>
                    <div>
                        <Link to='/board' style={{
                            color: 'white',
                            textDecoration: 'none'}}>
                            <div style={{cursor: 'pointer'}}>게시판</div>
                        </Link>
                    </div>
                    <div>
                    <Dropdown className='dropdown' isOpen = {isDropdown} toggle={toggle}>
                        <DropdownToggle style={{
                            boxShadow: 'none', 
                            background: '#414141', 
                            border: 'none',
                            width: '100%', 
                            height: '100%'}}>
                            로그인                                    
                        </DropdownToggle>
                        <DropdownMenu className='dropdownMenu'>
                            <DropdownItem className='dropdownItem'>
                                <Link to='/login'
                                    style={{
                                        textDecorataion: 'none',
                                        color: '#FFFFFF',
                                        width: '100%',
                                        textAlign:'center'}}>
                                    Login
                                </Link>
                            </DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem className='dropdownItem'>
                                <Link to='/signup'
                                    style={{
                                        textDecorataion: 'none',
                                        color: '#FFFFFF',
                                        width: '100%',
                                        textAlign:'center'}}>
                                    Sign Up
                                </Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </div>
                </div>
        </div>
        </div>
    )
}

export default BeforeMenu;