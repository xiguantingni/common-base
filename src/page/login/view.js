/**
 * Created by RCC on 2018/6/20.
 */

import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './index.less';
import { dispatch } from '@util/dispatch';
import { connect } from 'react-redux'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMsg: ''
        }
    }
    handleLogin() {
        const { username, password } = this.state;
        if (!username) {
            this.setState({
                errorMsg: '用户名不能为空！'
            });
            return;
        }
        if (!password) {
            this.setState({
                errorMsg: '密码不能为空！'
            });
            return;
        }
        this.setState({
            errorMsg: ''
        });
        dispatch({
            type: 'login/loginRequest',
            payload: {
                url: '/login',
                method: 'POST',
                body: {username, password},
                successCallback: () => {
                    this.props.history.push('/overview');
                }
            }
        });
    }
    handleUsernameChange(e) {
        var username = e.target.value;
        this.setState({username});
    }
    handlePasswordChange(e) {
        var password = e.target.value;
        this.setState({password});
    }
    render() {
        const { errorTip, loading } = this.props;
        const { username, password, errorMsg } = this.state;
        const error = errorTip || errorMsg || '';
        return (
            <div className="login-page">
                <div className="login-box">
                    <div className="logo">
                        <div className="login-small" />
                        <div className="login-big" />
                    </div>
                    {
                        error ? <div className="tip">{error}</div> : null
                    }
                    <div className="form-input">
                        <Input
                            prefix={<i className="iconfont icon-user"
                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            onChange={this.handleUsernameChange.bind(this)}
                            value={username}
                        />
                        <Input
                            prefix={<i className="iconfont icon-lock"
                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            onChange={this.handlePasswordChange.bind(this)}
                            value={password}
                        />
                        <Button loading={loading} className="login-btn" onClick={this.handleLogin.bind(this)} type="primary">登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const Login = Form.create()(LoginForm);

export default connect(({login}) => ({...login}))(Login);
