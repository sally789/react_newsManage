import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import './index.css'
import axios from 'axios'

const { Sider } = Layout
const { SubMenu } = Menu
function SideMenu(props) {
  const [state, setstate] = useState([])
  const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    axios.get('http://localhost:8000/rights?_embed=children').then((response) => {
      // console.log(response.data)
      setstate(response.data)
    })
  }, [])
  const { location, history } = props
  const selected = [location.pathname]
  const opened = [`/${location.pathname.split('/')[1]}`]
  // console.log(opened)
  const renderMenu = (menuList) => menuList.map((menu) => {
    const { children = [] } = menu
    if (children.length > 0 && rights.includes(menu.key)) {
      return (
        <SubMenu key={menu.key} title={menu.title} icon={menu.icon}>
          {
          renderMenu(menu.children)
        }
        </SubMenu>
      )
    }
    // console.log(rights.includes(menu.key))
    return (rights.includes(menu.key)
      ? (
        <Menu.Item
          key={menu.key}
          icon={menu.icon}
          onClick={() => {
            history.push(menu.key)
          }}
        >
          {menu.title}
        </Menu.Item>
      ) : null
    )
  })

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo">全球新闻发布</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={selected} defaultOpenKeys={opened}>
        {
              renderMenu(state)
            }
      </Menu>
    </Sider>
  )
}
export default withRouter(SideMenu)
