import React, {useEffect} from 'react';
import Home from './home/Home';
import SignUp from './sign/signup/SignUp';
import Board from './board/Board';
import Success from './success/Success';
import Write from './board/Write';
import Article from './board/Article'
import Source from './source/Source';
import MyPage from './mypage/MyPage';
import Forgot from './sign/login/forgot/Forgot';
import Change from './sign/login/change/Change';
import Login from './sign/login/Login';
import DeleteUser from './mypage/DeleteUser';
import ScrollToTop from './ScrollToTop';
import {Route, BrowserRouter as Router} from 'react-router-dom';
function App() {
  useEffect(() => {
    localStorage.setItem('isLogin', 'false');
    localStorage.setItem('userArray', []);
  }, []);

  return (
    <div style={{background: '#393939', height: '990px'}}>
        <Router>
          <ScrollToTop>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/board' component={Board}/>
            <Route path='/success' component={Success}/>
            <Route exact path='/write' component={Write}/>
            <Route exact path='/article/:id' component={Article}/>
            <Route exact path='/source/:item' component={Source}/>
            <Route exact path='/mypage' component={MyPage}/>
            <Route exact path='/forgot' component={Forgot}/>
            <Route exact path='/changepwd' component={Change}/>
            <Route exact path='/deleteuser' component={DeleteUser}/>
          </ScrollToTop>
        </Router>
    </div>
  );
}

export default App;
