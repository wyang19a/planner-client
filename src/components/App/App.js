import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Tasks from '../Task/Tasks/Tasks'
// import TaskCreate from '../Task/TaskCreate/TaskCreate'
import Task from '../Task/Task/Task'
// import TaskEdit from '../Task/TaskEdit/TaskEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp
              alert={this.alert}
              setUser={this.setUser}
            />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn
              alert={this.alert}
              setUser={this.setUser}
            />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut
              alert={this.alert}
              clearUser={this.clearUser}
              user={user}
            />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword
              alert={this.alert}
              user={user}
            />
          )} />
        </main>
        <AuthenticatedRoute user={user} exact path='/tasks' render={({ match }) => (
          <Tasks
            match={match}
            alert={this.alert}
            user={user}
          />
        )} />
        <AuthenticatedRoute user={user} exact path='/tasks/:id' render={({ match }) => (
          <Task
            match={match}
            alert={this.alert}
            user={user}
          />
        )} />
      </Fragment>
    )
  }
  // <AuthenticatedRoute user={user} exact path='/tasks/:id/edit' render={({ match }) => (
  //   <TaskEdit match={match} alert={this.alert} user={user} />
  // )} />
}

export default App
