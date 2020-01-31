import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'

const Task = props => {
  const [task, setTask] = useState(null)

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

  if (!task) {
    return <p className="task-detail">Loading...</p>
  }

  return (
    <div className="task-detail">
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
