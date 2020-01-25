import React from 'react'
// import './TaskForm.scss'
// const Datetime = require('react-datetime')

const TaskForm = ({ task, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <h4>Title</h4>
    <input
      placeholder="Task Title"
      type="text"
      value={task.title}
      onChange={handleChange}
      name="title"
    />
    <br/>
    <h4>Description</h4>
    <textarea
      cols="40"
      rows="10"
      placeholder="Task Description"
      type="text"
      value={task.description}
      onChange={handleChange}
      name="description"
    />
    <br/>
    <h4>From</h4>
    <input
      type="datetime-local"
      value={task.Tfrom}
      onChange={handleChange}
      name="Tfrom"
    />
    <br/>
    <h4>To</h4>
    <input
      type="datetime-local"
      value={task.Tto}
      onChange={handleChange}
      name="Tto"
    />
    <br/>
    <button type="submit">Submit</button>
  </form>
)

export default TaskForm
