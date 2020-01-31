import React, { useState, useEffect } from 'react'
// import { getTasks } from '../api/tasks'
import TaskList from '../TaskList/TaskList'
import TaskCreate from '../TaskCreate/TaskCreate'
// import { Link } from 'react-router-dom'
// import messages from '../../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
// import AuthenticatedRoute from '../../AuthenticatedRoute/AuthenticatedRoute'
import TaskEdit from '../TaskEdit/TaskEdit'
// import { Calendar } from '@fullcalendar/core'
// import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'

const Tasks = props => {
  const [tasks, setTasks] = useState([])
  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState('')
  const [editForm, setEditForm] = useState(false)
  const [todoNum, setTodoNum] = useState(0)
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
      .then(res => {
        setTasks(res.data.tasks)
        return res
      })
      .then(res => setTodoNum(res.data.tasks.filter(task => task.completed === false).length))
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
      setEdit={setEdit}
      setEditId={setEditId}
      setEditForm={setEditForm}
      editForm={editForm}
      setTodoNum={setTodoNum}
      todoNum={todoNum}
      tasks={tasks}
      setTasks={setTasks}
    />
  ))
  // return list of tasks, and TaskCreate form.
  return (
    <div className="container-2">
      <div className="task-head">
        <h2>{todoNum ? `You have ${todoNum} tasks remaining!` : 'You don\'t have any task. Creat one!'}</h2>
      </div>
      <div className="task-container">
        {taskList}
      </div>
      {edit
        ? <TaskEdit
          setEdit={setEdit}
          setEditId={setEditId}
          editId={editId}
          user={props.user}
          setEditForm={setEditForm}
          alert={props.alert}
        />
        : <TaskCreate
          alert={props.alert}
          user={props.user}
          setTasks={setTasks}
          tasks={tasks}
          setTodoNum={setTodoNum}
          todoNum={todoNum}
        />}
    </div>
  )
}

export default Tasks
