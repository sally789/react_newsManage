import React, { useState } from 'react'
import {
  Layout, Dropdown, Menu, Avatar,
} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Header } = Layout
export default function TopHeader() {
  const [collapsed, setState] = useState(false)
  const chang = () => {
    setState(!collapsed)
  }
  const menu = (
    <Menu>
      <Menu.Item>
        111
      </Menu.Item>
      <Menu.Item danger>
        222
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {
          collapsed ? <MenuUnfoldOutlined onClick={chang} /> : <MenuFoldOutlined onClick={chang} />
            }
      <div style={{ float: 'right' }}>
        <span>欢迎回来</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}
