import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
const BeforeMenu = () => {
    const [isDropdown, setIsDropdown] = useState(false);
    const toggle = () => {
        setIsDropdown(prev => !prev);
    }

    const dropDownHover = () => {
        
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
                            width: '100%',
                            height: '80px'}}>
                            <Link to='/board' style={{
                                color: 'inherit', 
                                textDecoration: 'none'}}>
                                <div style={{cursor: 'pointer'}}>Board</div>
                            </Link>

                            <Dropdown isOpen = {isDropdown} toggle={toggle}>
                                <DropdownToggle style={{boxShadow: 'none', background: '#000000', border: 'none', height: '100%'}}>
                                    Login                                    
                                </DropdownToggle>
                                <DropdownMenu onMouseOver={dropDownHover} style={{background: '#000000'}}>
                                    <DropdownItem>
                                        <Link to='/signup' style={{background: '#000000', color: '#FFFFFF'}}>회원가입</Link>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem style={{color: '#FFFFFF'}}>로그인</DropdownItem>
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