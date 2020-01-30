import React from 'react'
import Datetime from 'react-datetime'

const yesterday = Datetime.moment().subtract(1, 'day')
const valid = function (current) {
  return current.isAfter(yesterday)
}

const TaskForm = ({ task, handleChange, handleSubmit, handleTimeFrom, handleTimeTo }) => (
  <form onSubmit={handleSubmit}>
    <h5>Title</h5>
    <input
      className="form-title-input"
      placeholder="Task Title"
      type="text"
      value={task.title}
      onChange={handleChange}
      name="title"
    />
    <br/>
    <h5>Description</h5>
    <textarea
      className="form-description-input"
      cols="40"
      rows="4"
      placeholder="Task Description"
      type="text"
      value={task.description}
      onChange={handleChange}
      name="description"
    />
    <br/>
    <h5>Date/Time</h5>
    <div className="datetime-input">
      <Datetime
        className="form-tfrom-input"
        inputProps={{
          placeholder: 'From'
        }}
        value={task.Tfrom ? task.Tfrom : ''}
        onChange={handleTimeFrom}
        utc={true}
        isValidDate={valid}
      />
      <Datetime
        className="form-tto-input"
        inputProps={{
          placeholder: 'To',
          background: 'none'
        }}
        value={task.Tto ? task.Tto : ''}
        onChange={handleTimeTo}
        utc={true}
        isValidDate={valid}
      />
    </div>
    <br/>
    <button type="submit">Submit</button>
  </form>
)

export default TaskForm
