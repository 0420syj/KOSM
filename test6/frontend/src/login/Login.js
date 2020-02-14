import React, {Component, useState} from 'react';
import './Login.scss';
import { login } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin}/>
                </div>
            </div>
        );
    }
}
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Cheeze Toon',
                            description: '아이디 혹은 비밀번호가 일치하지 않습니다. 다시 시도해주세요.'
                        });                    
                    } else {
                        notification.error({
                            message: 'Cheeze Toon',
                            description: error.message || '다시 시도해주세요.'
                        });                                            
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: '아이디 혹은 이메일을 입력해주세요.' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="usernameOrEmail" 
                        placeholder="Username or Email" />    
                    )}
                </div>
                <div>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '비밀번호를 입력해주세요.' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                )}
                </div>
                <div>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                    </div>
            </Form>
        );
    }
}


export default Login;