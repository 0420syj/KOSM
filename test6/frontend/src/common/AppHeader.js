import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Sider } = Layout;



class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.state = {
          role : this.props.role
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    componentDidMount(){
    
    }
    render() {
        let menuItems;
        if(this.props.role === "ROLE_ADMIN") {
          menuItems = [ 
          <Menu.Item key="/adminmenu">
            <Link to="/adminmenu">
              Admin
            </Link>
          </Menu.Item>,
          <Menu.Item key="/profile" className="profile-menu">
          <ProfileDropdownMenu 
            currentUser={this.props.currentUser} 
            handleMenuClick={this.handleMenuClick}/>
          </Menu.Item>
        ]; 
      } else if(this.props.role ==="ROLE_USER") {   //로그인 된 상태
          menuItems = [
            <Menu.Item key="/profile" className="profile-menu">
              <ProfileDropdownMenu 
                currentUser={this.props.currentUser} 
                handleMenuClick={this.handleMenuClick}/>
          </Menu.Item>
          ];
      } else {
          menuItems = [
          <Menu.Item key="/login">
              <Link to="/login">Login</Link>
          </Menu.Item>,
          <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
          </Menu.Item>                  
          ];
      }

    return (
      <Layout>
        <Header className="app-header">
          <div className="container">
            <div className="app-title" >
              <Link to="/">HOME</Link>
            </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  {menuItems}
              </Menu>
          </div>
          </Header>
         
      </Layout>
        );
    }
}
   

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser.name}
        </div>
        <div className="username-info">
          {props.currentUser.username}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
      <Dropdown 
        overlay={dropdownMenu} 
        trigger={['click']}
        getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
        <a className="ant-dropdown-link">
           <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
    
    export default withRouter(AppHeader);