// import React, { Component } from 'react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import messages from '../../AutoDismissAlert/messages'
import apiUrl from '../../../apiConfig'

const Task = props => {
  const [task, setTask] = useState(null)
  // const [deleted, setDeleted] = useState(false)
  // const [completed, setCompleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/tasks/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setTask(res.data.task))
      .catch(console.error)
  }, [])

  // const destroy = () => {
  //   axios({
  //     url: `${apiUrl}/tasks/${props.match.params.id}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Bearer ${props.user.token}`
  //     }
  //   })
  //     .then(() => setDeleted(true))
  //     .then(() => props.alert({
  //       heading: 'Deleted',
  //       message: messages.deleteTaskSuccess,
  //       variant: 'success'
  //     }))
  //     .catch(console.error)
  // }

  if (!task) {
    return <p>Loading...</p>
  }

  // if (deleted) {
  //   return <Redirect to={
  //     { pathname: '/tasks', state: { msg: 'Task succesfully deleted!' } }
  //   } />
  // }

  return (
    <div className="task-item">
      <h4>{task.title}</h4>
      <hr/>
      <p>{task.description}</p>
      <p>{task.Tfrom}</p>
      <p>{task.Tto}</p>
      <Link to="/tasks">Back to all tasks</Link>
    </div>
  )
}

export default Task
