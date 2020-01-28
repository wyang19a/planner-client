import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
// import TaskCreate from '../TaskCreate/TaskCreate'
const TaskList = props => {
  const [completed, setCompleted] = useState(props.completed)

  const setComplete = () => {
    axios({
      url: `${apiUrl}/tasks/${event.target.name}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: {
        task: {
          completed: !completed
        }
      }
    })
      .then(res => setCompleted(res.data.task.completed))
  }

  return (
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
      <Link to={`/tasks/${props.id}`} style={{ textDecoration: 'none' }}>
        <div className={completed ? 'task-items complete' : 'task-items incomplete'}>
          {props.title}
        </div>
      </Link>
    </div>
  )
}

export default TaskList
