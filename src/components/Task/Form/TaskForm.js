import React from 'react'
import Datetime from 'react-datetime'

const yesterday = Datetime.moment().subtract(2, 'day')
const valid = function (current) {
  return current.isAfter(yesterday)
}

const TaskForm = ({ task, handleChange, handleSubmit, handleTimeFrom, handleTimeTo }) => (
  <form onSubmit={handleSubmit}>
    <div className="heading-container">
      <h5 className="title-head">Title</h5>
    </div>
    <input
      className="form-title-input"
      placeholder="Task Title"
      type="text"
      value={task.title}
      onChange={handleChange}
      name="title"
    />
    <br/>
    <div className="heading-container">
      <h5 className="desc-head">Description</h5>
    </div>
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
    <div className="heading-container">
      <h5 className="datetime-head">Date/Time</h5>
    </div>
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
        value={task.Tto}
        onChange={handleTimeTo}
        utc={true}
        isValidDate={valid}
      />
    </div>
    <br/>
    <div className="submit-btn-container">
      <button type="submit" className="form-submit">Submit</button>
    </div>
  </form>
)

export default TaskForm
