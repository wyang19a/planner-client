import React, { useState, useEffect } from 'react'
// import { getTasks } from '../api/tasks'
import TaskList from '../TaskList/TaskList'
import TaskCreate from '../TaskCreate/TaskCreate'
// import { Link } from 'react-router-dom'
// import messages from '../../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
// import AuthenticatedRoute from '../../AuthenticatedRoute/AuthenticatedRoute'
// import TaskEdit from '../TaskEdit/TaskEdit'

const Tasks = props => {
  const [tasks, setTasks] = useState([])

  // console.log(props.user)
  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl + '/tasks',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setTasks(res.data.tasks))
      .catch(console.error)
  }, [])

  const taskList = tasks.map(task => (
    <TaskList
      key={task.id}
      id = {task.id}
      title = {task.title}
      description = {task.description}
      Tfrom = {task.Tfrom}
      Tto = {task.Tto}
      completed = {task.completed}
      user = {props.user}
      alert = {props.alert}
    />
  ))

  return (
    <div className="container-2">
      <div className="task-head">
        <h3>Tasks</h3>
      </div>
      <div className="task-container">
        {taskList}
      </div>
      <TaskCreate
        alert = {props.alert}
        user = {props.user}
      />
    </div>
  )
}

export default Tasks
