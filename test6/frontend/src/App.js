import React, {useState} from 'react';
import Home from './home/Home';
import SignUp from './sign/signup/SignUp';
import Board from './board/Board';
import Source from './source/Source';
import MyPage from './mypage/MyPage';
import ForgotPassword from './sign/login/ForgotPassword';
import {Route, BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <div>
      <Router>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/board' component={Board}/>
        <Route exact path='/source/:item' component={Source}/>
        <Route exact path='/mypage' component={MyPage}/>
        <Route exact path='/forgot' component={ForgotPassword}/>
      </Router>
    </div>
  );
}

export default App;

// import React, {Component} from 'react';

// import {withRouter, Switch, Route} from 'react-router-dom';
// import { getCurrentUser } from './util/APIUtils';
// import { ACCESS_TOKEN } from './constants';

// import SignUp from './signup/SignUp';
// import Login from './login/Login';

// import AppHeader from './common/AppHeader';
// import LoadingIndicator from './common/LoadingIndicator';
// import Profile from './profile/Profile';

// import { Layout, notification } from 'antd';
// const { Content } = Layout;


// // import { render } from 'node-sass';
// // import { LayoutContext } from 'antd/lib/layout/layout';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentUser: null,
//       isAuthenticated: false,
//       isLoading: false,
//       role: null,
//       username : null
//     }
//     this.handleLogout = this.handleLogout.bind(this);
//     this.loadCurrentUser = this.loadCurrentUser.bind(this);
//     this.handleLogin = this.handleLogin.bind(this);

//     notification.config({
//       placement: 'topRight',
//       top: 70,
//       duration: 3,
//   });  
//   }

//   loadCurrentUser() {
//     this.setState({
//       isLoading: true
//     });
//     getCurrentUser()
//     .then(response => {
//       this.setState({
//         currentUser: response,
//         isAuthenticated: true,
//         isLoading: false,
//         username : response.username,
//         role : response.authorities[0].authority
//       },function(){
//       });
//     }).catch(error => {
//       this.setState({
//         isLoading: false
//       });  
//     });
//   }

//   componentDidMount() {
//     this.loadCurrentUser();
//   }

//   // Handle Logout, Set currentUser and isAuthenticated state which will be passed to other components
//   handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
//     localStorage.removeItem(ACCESS_TOKEN);

//     this.setState({
//       currentUser: null,
//       isAuthenticated: false,
//       role:null,
//       username: null
//     });

//     this.props.history.push(redirectTo);
//     notification[notificationType]({
//       message: 'Cheeze Toon',
//       description: description,
//     });
//   }

//   handleLogin() {
//     notification.success({
//       message: 'Cheeze Toon',
//       description: "로그인 되었습니다.",
//     });
//     this.loadCurrentUser();
//     this.props.history.push("/");
//   }

//   render(){
//     if(this.state.isLoading) {
//       return <LoadingIndicator />
//     }
//     return (
//       <Layout className="app-container">
//       <AppHeader isAuthenticated={this.state.isAuthenticated} 
//         currentUser={this.state.currentUser} 
//         onLogout={this.handleLogout} 
//         role={this.state.role}/>

//       <Content className="app-content">
//         <div className="container">
//           <Switch>      
           
//             <Route exact path="/login" 
//               render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
//             <Route exact path='/signup' component={SignUp}/>
//             <Route path="/users/:username" 
//               render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}/>
            
//           </Switch>
//         </div>
//       </Content>
//       </Layout>
//     );
//   }
// }
// export default withRouter(App);