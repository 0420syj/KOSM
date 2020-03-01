import React, {useEffect} from 'react';
import Home from './home/Home';
import SignUp from './sign/signup/SignUp';
import Board from './board/Board';
import Write from './board/Write';
import Article from './board/Article'
import Source from './source/Source';
import MyPage from './mypage/MyPage';
import ChangePassword from './sign/login/ChangePassword';
import ForgotPassword from './sign/login/ForgotPassword';
import Login from './sign/login/Login';
import DeleteUser from './mypage/DeleteUser';
import {Route, BrowserRouter as Router} from 'react-router-dom';
function App() {
  // useEffect(() => {
  //   localStorage.setItem('isLogin', 'false');
  // }, []);

  return (
    <div style={{background: '#393939', height: '990px'}}>
      <Router>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/board' component={Board}/>
        <Route exact path='/write' component={Write}/>
        <Route exact path='/article/:id' component={Article}/>
        <Route exact path='/source/:item' component={Source}/>
        <Route exact path='/mypage' component={MyPage}/>
        <Route exact path='/forgot' component={ForgotPassword}/>
        <Route exact path='/deleteuser' component={DeleteUser}/>
        <Route exact path='/changepwd' component={ChangePassword}/>
      </Router>
    </div>
  );
}

export default App;
