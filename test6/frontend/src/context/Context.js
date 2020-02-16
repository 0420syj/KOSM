import {createContext} from 'react';
const Context = createContext({
    SSIBAL : {
        isLogin: false,
        email:'email',
        username: '',
        password: '',
        phoneNum: '',
    },
    setting : () => {},
    setIsLogin: () => {},
    getLogin : () => {},
    getEmail: () => {},
    getUserName: () => {},
    getPhoneNum: () => {},
    getPassword: () => {},
});

export default Context;
