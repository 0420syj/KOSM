import React, {useState} from 'react';
import Context from './Context';

const UserProvider = ({children}) => {
    const setIsLogin = (value) => {
        setUserInfo(prev => {
            return {
                ...prev,
                isLogin : value,
            }
        })
    }

    const initialState = {
        isLogin: false,
        email:'email',
        username: '',
        password: '',
        phoneNum: '',
    }

    const [SSIBAL, setUserInfo] = useState(initialState);


    return ( 
        <Context.Provider value={SSIBAL}>
            {children}
        </Context.Provider>
    )
}

export default UserProvider;