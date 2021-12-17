import React from 'react'
import {
  HashRouter, Switch, Route,
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
          render={() => (<News />)}
        />
      </Switch>
    </HashRouter>
  )
}
