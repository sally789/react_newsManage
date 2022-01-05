import React from 'react'
import {
  HashRouter, Switch, Route, Redirect,
} from 'react-router-dom'
import Login from '../views/login/login'
import News from '../views/News/news'

export default function index() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/"
          render={() => (
            localStorage.getItem('token') ? <News /> : <Redirect to="/login" />
          )}
        />
      </Switch>
    </HashRouter>
  )
}
