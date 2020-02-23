import React, {useState, useEffect, useContext} from 'react';
import BeforeLogin from '../menu/before/BeforeLogin';
import AfterLogin from '../menu/after/AfterLogin';

const Home = () => {
    const [user, setUser] = useState({
        isLogin: 'false',
        email: '',
        username: '',
        password: '',
        phonenumber: '',
    }); 
    useEffect(() => {
        setUser({
            ...user,
            isLogin : false
        });
    }, [user.isLogin]);
    return ( 
        <div>
            {
                localStorage.getItem('isLogin') === 'true'?
                <AfterLogin user={user} setUser = {setUser}/> :
                <BeforeLogin user={user} setUser = {setUser}/>
            }
        </div>
    )
}

export default Home;