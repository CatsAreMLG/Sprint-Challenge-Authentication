import React, { Component } from 'react'
import { Route, NavLink, withRouter } from 'react-router-dom'

import Jokes from './components/Jokes'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

class App extends Component {
  state = {
    token: localStorage.getItem('jwt') || ''
  }
  setToken = token => {
    localStorage.setItem('jwt', token)
    this.setState({ token })
    this.props.history.push('/jokes')
  }
  logout = _ => {
    localStorage.removeItem('jwt')
    this.setState({ token: '' })
  }
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            {this.state.token === '' ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <span> | </span>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/jokes">Jokes</NavLink>
                <span> | </span>
                <button onClick={this.logout}>Logout</button>
              </>
            )}
          </nav>
        </header>
        {this.state.token === '' ? (
          <>
            <Route
              path="/login"
              component={props => <Login {...props} setToken={this.setToken} />}
            />
            <Route
              path="/register"
              component={props => (
                <Register {...props} setToken={this.setToken} />
              )}
            />
          </>
        ) : null}
        <Route
          path="/jokes"
          component={props => <Jokes {...props} token={this.state.token} />}
        />
      </div>
    )
  }
}

export default withRouter(App)
