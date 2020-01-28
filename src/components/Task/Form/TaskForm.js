import React from 'react'
// import './TaskForm.scss'
// const Datetime = require('react-datetime')

const TaskForm = ({ task, handleChange, handleSubmit }) => (
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
    <input
      type="datetime-local"
      value={task.Tfrom ? task.Tfrom : ''}
      onChange={handleChange}
      name="Tfrom"
    />
    <br/>
    <h5>To</h5>
    <input
      type="datetime-local"
      value={task.Tto ? task.Tto : ''}
      onChange={handleChange}
      name="Tto"
    />
    <br/>
    <button type="submit">Submit</button>
  </form>
)

export default TaskForm
