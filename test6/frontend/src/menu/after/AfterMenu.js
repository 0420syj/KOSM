import React, {useState, memo, useMemo} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import './AfterMenu.scss';

const Title = memo(() => {
   
    return (
    <div 
        style={{
            cursor: 'pointer',
            height: '53px',
            fontFamily: 'Libre Franklin',
            fontSize: '47px',
            fontWeight: '500',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1.13',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#3aada8',}}>
        KOSM
    </div>
    )
});



const AfterMenu = memo((props) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const history = useHistory();

    const logoutClick = () => {
        sessionStorage.setItem('isLogin', 'false');
        sessionStorage.setItem('email', '');
        sessionStorage.setItem('username', '');
        sessionStorage.setItem('password', '');
        sessionStorage.setItem('phonenumber', '');
        history.push('/');
    }
    
    const toggle = () => {setIsDropdown(!isDropdown);}
    

    return ( 
        <div>
            <div className='menuContainer'>
                <div className='also-menu-container'>
                    <div className='leftContainer'>
                        {
                            useMemo(
                                () => {
                                return (
                                    <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
                                        <Title/>
                                    </Link>
                                )
                            }, [])
                        }
                    </div>
                    <div className="menu" style={{display: 'flex', justifyContent:'space-between', width: '219.2px', marginRight: '50px', height: '100%'}}>
                        <Link to='/about' style={{color: 'inherit', textDecoration: 'none'}}>
                            <div style={{cursor: 'pointer'}}>소개</div>
                        </Link>
                        <Link to='/board' style={{color: 'inherit', textDecoration: 'none'}}>
                            <div style={{cursor: 'pointer'}}>게시판</div>
                        </Link>
                        <div>
                            <Dropdown isOpen = {isDropdown} toggle={toggle}>
                                <DropdownToggle className="username-button" style={{padding: '0px', background: '#414141', width: '80px', border: 'none'}}>
                                    {sessionStorage.getItem('username')}
                                </DropdownToggle>
                                <DropdownMenu className='dropdown-menu' >
                                    <DropdownItem className="dropdown-item" onClick={logoutClick}>
                                        Logout
                                    </DropdownItem>
                                    <DropdownItem className="dropdown-item" onClick={() => {history.push('/mypage')}}>
                                        My Page
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default AfterMenu;