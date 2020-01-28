import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import messages from '../../AutoDismissAlert/messages'
import apiUrl from '../../../apiConfig'
// import { destroy } from '../Task/Task'
// import TaskCreate from '../TaskCreate/TaskCreate'
const TaskList = props => {
  const [completed, setCompleted] = useState(props.completed)
  const [deleted, setDeleted] = useState(false)

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
      .then(res => setCompleted(res.data.task.completed))
  }
  const destroy = () => {
    axios({
      url: `${apiUrl}/tasks/${props.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => props.alert({
        heading: 'WOOT WOOT',
        message: messages.deleteTaskSuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/tasks' }
    } />
  }
  return (
    <div>
      <li className="item">
        <a href="#" className="acc-menu">
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
        </a>
        <div className="smenu">
          <Link to={`/tasks/${props.id}/edit`} match={props.match} user={props.user}>Edit</Link>
          <a onClick={destroy} className="delete-btn">Delete</a>
          <Link to={`/tasks/${props.id}`}>Details</Link>
        </div>
      </li>
    </div>
  )
}

export default TaskList
