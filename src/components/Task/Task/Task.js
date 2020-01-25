// import React, { Component } from 'react'
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import messages from '../../AutoDismissAlert/messages'
import apiUrl from '../../../apiConfig'

// class Task extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       task: null,
//       deleted: false
//     }
//   }

const Task = props => {
  const [task, setTask] = useState(null)
  const [deleted, setDeleted] = useState(false)

  // componentDidMount () {
  //   axios(`${apiUrl}/tasks/${this.props.match.params.id}`)
  //     .then(res => this.setState({ task: res.data.task }))
  //     .catch(console.error)
  // }
  useEffect(() => {
    axios(`${apiUrl}/tasks/${props.match.params.id}`)
      .then(res => setTask(res.data.task))
      .catch(console.error)
  }, [])

  // destroy = () => {
  //   axios({
  //     url: `${apiUrl}/tasks/${this.props.match.params.id}`,
  //     method: 'DELETE'
  //   })
  //     .then(() => this.setState({ deleted: true }))
  //     .catch(console.error)
  // }

  const destroy = () => {
    axios({
      url: `${apiUrl}/tasks/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => props.alert({
        heading: 'Deleted',
        message: messages.deleteTaskSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }
  // don't need render.
  // render () {
  //   const { task, deleted } = this.state

  if (!task) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Task succesfully deleted!' } }
    } />
  }

  // return (
  //   <Layout>
  //     <h4>{task.title}</h4>
  //     <p>Date relased: {task.year}</p>
  //     <p>Directed by: {task.director}</p>
  //     <button onClick={this.destroy}>Delete Task</button>
  //     <Link to={`/tasks/${this.props.match.params.id}/edit`}>
  //       <button>Edit</button>
  //     </Link>
  //     <Link to="/tasks">Back to all tasks</Link>
  //   </Layout>
  // )
  return (
    <div>
      <h4>{task.title}</h4>
      <hr/>
      <p>{task.description}</p>
      <p>{task.Tfrom}</p>
      <p>{task.Tto}</p>
      <button onClick={destroy}>Delete Task</button>
      <Link to={`/tasks/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/">Back to all tasks</Link>
    </div>
  )
}

export default Task
