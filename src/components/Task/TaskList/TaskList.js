import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import messages from '../../AutoDismissAlert/messages'
import apiUrl from '../../../apiConfig'
// TaskList is called from Tasks/Tasks.js

const TaskList = props => {
  // completed, deleted states
  const [completed, setCompleted] = useState(props.completed)
  const [deleted, setDeleted] = useState(false)
  // set backend completed to whatever is not state completed when checkbox is clicked.
  const setComplete = () => {
    axios({
      url: `${apiUrl}/tasks/${event.target.name}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        task: {
          completed: !completed
        }
      }
    })
    // set state to backend completed
      .then(res => {
        setCompleted(res.data.task.completed)
        // console.log(props.tasks, props.id)
        return res
      })
      .then(props.tasks.find(task => task.id === props.id).completed = !completed)
      .then(props.setTodoNum(props.tasks.filter(task => task.completed === false).length))
      .catch(console.error)
  }
  // destroy clicked id
  const destroy = () => {
    props.todoNum > 0 ? props.setTodoNum(props.todoNum - 1) : props.setTodoNum(props.todoNum)
    axios({
      url: `${apiUrl}/tasks/${props.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      // set state deleted to true
      .then(() => setDeleted(true))
      // alert message for deleting a message
      .then(() => props.alert({
        heading: 'Deleted',
        message: messages.deleteTaskSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }
  // redirect to tasks when
  if (deleted) {
    return <Redirect to={
      { pathname: '/tasks' }
    } />
  }
  const setEdit = () => {
    props.setEditId('')
    props.setEdit(true)
    props.setEditId(props.id)
    props.setEditForm(true)
  }
  return (
    <div>
      <li className="item">
        <div className="list-container">
          <div className="complete-check">
            <input
              type='checkbox'
              key={props.id}
              name={props.id}
              value={props.completed}
              onClick={setComplete}
              defaultChecked={completed}
            />
          </div>
          <div className={completed ? 'task-items complete' : 'task-items'}>
            {props.title}
          </div>
        </div>
        <div className="accmenu">
          {props.editForm ? '' : <a style={{ color: 'white' }} onClick={setEdit}>Edit</a>}
          <Link to={`/tasks/${props.id}`}>Details</Link>
          <a onClick={destroy} style={{ color: 'white' }} className="delete-btn">Delete</a>
        </div>
      </li>
    </div>
  )
}

export default TaskList
