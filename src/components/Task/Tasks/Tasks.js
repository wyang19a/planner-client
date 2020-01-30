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
// import { Calendar } from '@fullcalendar/core'
// import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'

const Tasks = props => {
  const [tasks, setTasks] = useState([])

  // Get all tasks
  useEffect(() => {
    axios({
      method: 'GET',
      url: apiUrl + '/tasks',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
    // Populate tasks states
      .then(res => setTasks(res.data.tasks))
      .catch(console.error)
  }, [])

  // map through the tasks state
  const taskList = tasks.map(task => (
    // call TaskList component, pass down id, title, description, times, completed, user and alert
    <TaskList
      key={task.id}
      id={task.id}
      title={task.title}
      description={task.description}
      Tfrom={task.Tfrom}
      Tto={task.Tto}
      completed={task.completed}
      user={props.user}
      alert={props.alert}
    />
  ))
  // return list of tasks, and TaskCreate form.
  return (
    <div className="container-2">
      <div className="task-head">
        <h3>Tasks</h3>
      </div>
      <div className="task-container">
        {taskList}
      </div>
      <TaskCreate
        alert={props.alert}
        user={props.user}
        setTasks={setTasks}
        tasks={tasks}
      />
    </div>
  )
}

export default Tasks
