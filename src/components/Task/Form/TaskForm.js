import React from 'react'
// import './TaskForm.scss'
import Datetime from 'react-datetime'
// import DateTimePicker from 'react-datetime-picker'

const TaskForm = ({ task, handleChange, handleSubmit, handleTimeFrom, handleTimeTo }) => (
  <form onSubmit={handleSubmit}>
    <h5>Title</h5>
    <input
      placeholder="Task Title"
      type="text"
      value={task.title}
      onChange={handleChange}
      name="title"
    />
    <br/>
    <h5>Description</h5>
    <textarea
      cols="40"
      rows="4"
      placeholder="Task Description"
      type="text"
      value={task.description}
      onChange={handleChange}
      name="description"
    />
    <br/>
    <h5>From</h5>
    <div className="datetime-input">
      <Datetime
        value={task.Tfrom ? task.Tfrom : ''}
        onChange={handleTimeFrom}
        utc={true}
      />
    </div>
    <br/>
    <h5>To</h5>
    <div className="datetime-input">
      <Datetime
        value={task.Tto ? task.Tto : ''}
        onChange={handleTimeTo}
        utc={true}
      />
    </div>
    <br/>
    <button type="submit">Submit</button>
  </form>
)

export default TaskForm
