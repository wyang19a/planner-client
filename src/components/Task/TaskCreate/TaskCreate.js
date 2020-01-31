import React, { useState } from 'react'
import TaskForm from '../Form/TaskForm'
import apiUrl from '../../../apiConfig'
import axios from 'axios'
// import { getTasks } from '../api/tasks'
// import { Redirect } from 'react-router-dom'

const TaskCreate = props => {
  const defaultTask = {
    title: '',
    description: '',
    Tfrom: '',
    Tto: '',
    completed: false
  }
  const [task, setTask] = useState(defaultTask)
  const [createdId, setCreatedId] = useState('')
  // const [tasks, setTasks] = useState([])
  // set state does 'shallow merge' (only 1 level)
  // Object.assign merges deeper
  const handleTimeFrom = (time) => {
    setTask({
      ...task,
      'Tfrom': time
    })
  }
  const handleTimeTo = (time) => {
    setTask({
      ...task,
      'Tto': time
    })
  }
  const handleChange = (props) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/tasks`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { task }
    })
      .then(res => {
        setCreatedId(res.data.task.id)
        return res
      })
      .then(res => {
        props.tasks.push(res.data.task)
        props.setTasks(props.tasks)
      })
      .then(props.setTodoNum(props.todoNum + 1))
      .then(() => {
        props.alert({
          heading: 'Success!',
          message: 'You created a task.',
          variant: 'success'
        })
      })
      .catch(() => {
        props.alert({
          heading: 'Title is required',
          message: 'Try Again.',
          variant: 'danger'
        })
      })
  }
  if (createdId) {
    setTask(defaultTask)
    setCreatedId('')
  }
  return (
    <div className="task-create">
      <h3> New Task </h3>
      <TaskForm
        task={task}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleTimeFrom={handleTimeFrom}
        handleTimeTo={handleTimeTo}
      />
    </div>
  )
}

export default TaskCreate
