import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import localStorage from '../../util/storage'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import "./login.styl"
import {checkLogin, doLogin} from "../../api/api";
import {rsa} from "../../util/rsa";

const FormItem = Form.Item;
message.config({
  top: 56,
  duration: 2,
  maxCount: 3,
});

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.visible=false
    this.state = {
      visible:false
    };
    console.log(this.props)
  }

  error (value){
    message.error(value.errorMessage);
  };



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        rsa(values.password).then((value)=>{
          doLogin({name:values.userName,password:value}).then((value)=>{
            if(value.errorCode != 0){
              //登录失败
              localStorage.setLoginStatus(false)
              this.error(value)
            }else{
              //登录成功
              // console.log(this.props)
              localStorage.setLoginStatus(true)
              localStorage.setUsername(values.userName)
              let data = {
                visible: false,//控制toolTip隐藏
                photo:value.data.photo,//修改登录后的头像
              }
              let path = {
                pathname:'/musichall/recommend',
                state:data,
              }
              this.props.showTips(false)
              this.props.history.push(path)
              window.location.reload()
            }
          })
        })

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '手机号不能为空' }],
          })(
            <Input type="number" maxLength="11" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码？</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <a href="">马上注册！</a>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login
