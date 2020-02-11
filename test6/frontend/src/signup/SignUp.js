import React, {Component, useState} from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../util/APIUtils';
import './SignUp.scss';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        //this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const signupRequest = {
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };
        /*
        axios.post("http://localhost:5000/api/auth/signup", {
            "username": userInfo.username,
            "email": userInfo.email,
            "password": userInfo.password
        })*/
        signup(signupRequest)
            .then(res => {
                notification.success({
                    message: 'Cheeze Toon',
                    description: "성공적으로 회원가입되었습니다. 로그인을 해주세요.",
                });          
                this.props.history.push("/login");  
            },(error) => {
                notification.error({
                    message: 'Cheeze Toon',
                    description: error.message || '다시 시도해주세요.'
                });
            });
    }
    render(){
    return (
        <div className='signUpScreen'>
            <div className='signUpContainer'>
                <div className='signUpTitle'>회원가입</div>
                <form onSubmit={this.handleSubmit} className='signUpForm'>
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>이름</div>
                        <input onChange={(event) => this.handleInputChange(event, this.validateName)} type='text' name='name' className='signUpSubInput'/>
                    </div>
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>닉네임</div>
                        <input  onChange={(event) => this.handleInputChange(event, this.validateName)} type='text' name='username' className='signUpSubInput'/>
                    </div>
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>이메일</div>
                        <input  onChange={(event) => this.handleInputChange(event, this.validateName)} type='text' name='email' className='signUpSubInput'/>
                    </div>
                    <div className='signUpFormContainer'>
                        <div className='signUpSubTitle'>비밀번호</div>
                        <input  onChange={(event) => this.handleInputChange(event, this.validateName)} type='password' name='password' className='signUpSubInput'/>
                    </div>
                    <div className='signUpButtonContainer'>
                        <button type='submit' className='signUpButton'>회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    )
    }

     // Validation Functions

     validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `너무 짧습니다. 최소 ${NAME_MIN_LENGTH} 글자 이상 입력해주세요.`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `너무 깁니다. 최대 ${NAME_MAX_LENGTH} 글자 이하로 입력해주세요.`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email는 비워둘 수 없습니다.'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: '유효한 Email이 아닙니다.'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `너무 깁니다. 최대 (Maximum ${EMAIL_MAX_LENGTH} 이하로 입력해주세요.`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `너무 짧습니다. 최소 ${USERNAME_MIN_LENGTH} 글자 이상 입력해주세요.`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `너무 깁니다. 최대 ${USERNAME_MAX_LENGTH} 글자 이하로 입력해주세요.`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'error',
                        errorMsg: '이미 존재하는 Username 입니다.'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });    
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: '이미 존재하는 Email 입니다. '
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `너무 짧습니다. 최소 ${PASSWORD_MIN_LENGTH} 글자 이상 입력해주세요.`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `너무 깁니다. 최대 ${PASSWORD_MAX_LENGTH} 글자 이하로 입력해주세요.`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

}
export default Signup;