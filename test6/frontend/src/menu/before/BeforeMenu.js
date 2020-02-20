import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import styled from 'styled-components';
import './BeforeMenu.scss';

const BeforeMenu = () => {
    const [isDropdown, setIsDropdown] = useState(false);
    const toggle = () => {
        setIsDropdown(prev => !prev);
    }
    
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
                    padding: '0% 4% 0% 2%',
                    height: '100%',
                    alignItems: 'center'}}>
                    <div style={{width: '80%'}}>
                        <Link to='/' style={{
                            color: 'inherit', 
                            textDecoration: 'none'}}>
                            <div style={{
                                cursor: 'pointer',
                                fontSize:'200%'}}>KOSM</div>
                        </Link>
                    </div>
                    <div style={{width: '15%'}}>
                        <div style={{
                            display: 'flex', 
                            justifyContent:'space-between', 
                            alignItems:'center',
                            width: '100%'}}>
                            <Link to='/board' style={{
                                color: 'inherit', 
                                textDecoration: 'none'}}>
                                <div style={{cursor: 'pointer'}}>Board</div>
                            </Link>

                            <Dropdown className='dropdown' isOpen = {isDropdown} toggle={toggle}>
                                <DropdownToggle style={{
                                    boxShadow: 'none', 
                                    background: '#000000', 
                                    border: 'none',
                                    width: '100%', 
                                    height: '100%'}}>
                                    Login                                    
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
        </div>
    )
}

export default BeforeMenu;