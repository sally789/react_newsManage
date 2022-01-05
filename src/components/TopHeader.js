import React, { useState } from 'react'
import {
  Layout, Dropdown, Menu, Avatar,
} from 'antd'
import { withRouter } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Header } = Layout
function TopHeader(props) {
  const [collapsed, setState] = useState(false)
  const chang = () => {
    setState(!collapsed)
  }
  const { history } = props
  const { role, username } = JSON.parse(localStorage.getItem('token'))
  const menu = (
    <Menu>
      <Menu.Item key="1">
        {role.roleName}
      </Menu.Item>
      <Menu.Item
        key="2"
        danger
        onClick={() => {
          history.replace('/login')
          localStorage.removeItem('token')
        }}
      >
        退出
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {
          collapsed ? <MenuUnfoldOutlined onClick={chang} /> : <MenuFoldOutlined onClick={chang} />
            }
      <div style={{ float: 'right' }}>
        <span style={{ marginRight: '10px' }}>
          欢迎
          <span style={{ color: '#1890ff' }}>{username}</span>
          回来

        </span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}
export default withRouter(TopHeader)
