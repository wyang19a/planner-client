import React, { useState } from 'react'
import TaskForm from '../Form/TaskForm'
import apiUrl from '../../../apiConfig'
import axios from 'axios'
// import { getTasks } from '../api/tasks'
import { Redirect } from 'react-router-dom'

const TaskCreate = props => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    Tfrom: '',
    Tto: '',
    completed: false
  })
  const [createdId, setCreatedId] = useState('')

  // set state does 'shallow merge' (only 1 level)
  // Object.assign merges deeper
  const handleTimeFrom = (props) => {
    setTask({
      ...task,
      'Tfrom': props
    })
  }
  const handleTimeTo = (props) => {
    setTask({
      ...task,
      'Tto': props
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
      .then(res => setCreatedId(res.data.task.id))
      .then(() => {
        props.alert({
          heading: 'Woot Woot!',
          message: 'You done created a task.',
          variant: 'success'
        })
      })
      .catch(() => {
        props.alert({
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
    console.log(createdId)
    return <Redirect to={`/tasks/${createdId}`} />
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
