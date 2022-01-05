import React from 'react'
import {
  Form, Input, Button, Checkbox, message,
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './login.css'
import axios from 'axios'

export default function Login(props) {
  const { history } = props
  const onFinish = (value) => {
    console.log(value)
    axios.get(`http://localhost:8000/users?username=${value
      .username}&password=${value.password}&roleState=true&_expand=role`).then(
      (response) => {
        if (response.data.length !== 0) {
          localStorage.setItem('token', JSON.stringify(response.data[0]))
          history.push('/')
        } else {
          message.error('用户名或密码不匹配')
        }
      },
    )
  }
  return (
    <div style={{ backgroundColor: '#103554', height: '100vh' }}>
      <div className="formContainer">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
