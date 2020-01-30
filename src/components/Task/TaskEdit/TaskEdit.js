import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import TaskForm from '../Form/TaskForm'

const TaskEdit = props => {
  const defaultTask = {
    id: '',
    title: '',
    description: '',
    Tfrom: '',
    Tto: ''
  }
  const [task, setTask] = useState(defaultTask)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/tasks/${props.editId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        setTask(res.data.task)
      })
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist() // use with every event handlers in react.
    setTask({ ...task, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.persist()
    event.preventDefault()

    axios({
      url: `${apiUrl}/tasks/${props.editId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { task }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }
  const setEditFalse = () => {
    props.setEdit(false)
  }
  if (updated) {
    return <Redirect to={`/tasks/${props.editId}`} />
  }
  return (
    <div className="task-item">
      <h3> Edit Task </h3>
      <TaskForm
        task={task}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/tasks/${props.editId}`}
      />
      <a onClick={setEditFalse}>Back to create</a>
    </div>
  )
}

export default TaskEdit
