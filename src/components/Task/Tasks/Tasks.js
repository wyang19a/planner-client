import React, { useState, useEffect } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import { getTasks } from '../api/tasks'
import messages from '../../AutoDismissAlert/messages'
import './Tasks.scss'

const Tasks = props => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks()
      .then(res => setTasks(res.data.tasks))
      .then(() => props.alert({
        heading: 'Get Tasks Success',
        message: messages.getTasksSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }, [])

  const taskList = tasks.map(task => (
    <div key={task.id}>
      <div> Title: {task.title}</div>
    </div>
  ))

  return (
    <div className="container">
      <div className="task-container">
        <div className="task-head">
          Tasks
        </div>
        <hr />
        <div className="task-item">
          { taskList }
        </div>
      </div>
    </div>
  )
}

export default Tasks
