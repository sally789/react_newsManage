import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { Layout } from 'antd'
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NoPermission from './nopermission/Nopermission'
import './news.css'

const { Content } = Layout
export default function News() {
  return (
    <Layout className="container">
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user-manage/list" component={UserList} />
            <Route path="/right-manage/role/list" component={RoleList} />
            <Route path="/right-manage/right/list" component={RightList} />
            <Redirect from="/" to="/home" exact="true" />
            <Route path="*" component={NoPermission} />
          </Switch>
        </Content>

      </Layout>

    </Layout>
  )
}
