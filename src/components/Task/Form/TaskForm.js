import React from 'react'

const TaskForm = ({ task, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      placeholder="Task Title"
      type="text"
      value={task.title}
      onChange={handleChange}
      name="title"
    />
    <textarea
      placeholder="Task Description"
      type="text"
      value={task.description}
      onChange={handleChange}
      name="description"
    />
    <button type="submit">Submit</button>
    <input
      type="datetime-local"
      value={task.Tfrom}
      onChange={handleChange}
      name="Tfrom"
    />
    <input
      type="datetime-local"
      value={task.Tto}
      onChange={handleChange}
      name="Tto"
    />
  </form>
)

export default TaskForm
