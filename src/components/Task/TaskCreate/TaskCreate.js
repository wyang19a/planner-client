import React, { Component } from 'react'
import TaskForm from '../Form/TaskForm'
import apiUrl from '../../../apiConfig'
import axios from 'axios'
// import { getTasks } from '../api/tasks'
import { Redirect } from 'react-router-dom'

class TaskCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      task: {
        title: '',
        description: '',
        Tfrom: '',
        Tto: '',
        completed: false
      },
      createdId: ''
    }
  }
  // set state does 'shallow merge' (only 1 level)
  // Object.assign merges deeper
  handleChange = event => {
    this.setState({
      task: {
        ...this.state.task,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/tasks`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        task: this.state.task
      }
    })
      .then(res => this.setState({ createdId: res.data.task.id }))
      .then(() => {
        this.props.alert({
          heading: 'Woot Woot!',
          message: 'You done created a task.',
          variant: 'success'
        })
      })
      .catch(() => {
        this.props.alert({
          heading: 'Something went wrong!',
          message: 'Try Again.',
          variant: 'danger'
        })
      })
  }
  // resetForm = () => {
  //   this.setState({
  //     ...this.state,
  //     task: {
  //       title: '',
  //       description: '',
  //       Tfrom: '',
  //       Tto: '',
  //       completed: false
  //     },
  //     createdId: ''
  //   })
  // }
  if (createdId) {
    // this.resetForm()
    return <Redirect to={`/tasks/${this.state.createdId}`} />
  }
  render () {
    return (
      <div className="task-create">
        <TaskForm
          task={this.state.task}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default TaskCreate
