import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import TaskList from '../TaskList/TaskList'
import apiUrl from '../../../apiConfig'
import TaskForm from '../Form/TaskForm'
// import Tasks from '../Tasks/Tasks'
const TaskEdit = props => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    Tfrom: '',
    Tto: ''
  })
  const [updated, setUpdated] = useState(false)
  const [tasks, setTasks] = useState([])

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

  const handleChange = event => {
    event.persist() // use with every event handlers in react.
    setTask({ ...task, [event.target.name]: event.target.value })
  }
  // try to use moment().format in another method
  const handleSubmit = event => {
    event.persist()
    event.preventDefault()

    axios({
      url: `${apiUrl}/tasks/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { task }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/tasks/${props.match.params.id}`} />
  }

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
      <TaskForm
        task={task}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/tasks/${props.match.params.id}`}
      />
    </div>
  )
}

export default TaskEdit
