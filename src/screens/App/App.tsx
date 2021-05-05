import React from 'react'
import { Button } from '@material-ui/core'
import './App.css'
import useTodoTasks from '../../store/todoTasks/useTodoTasks'

function App(): JSX.Element {
  const {
    todoTasks,
    addTodoTasks,
    deleteTodoTasks,
    updateTodoTasks,
  } = useTodoTasks()

  const newTask = {
    title: 'テスト',
    date: new Date().toString(),
  }

  console.log(typeof todoTasks)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        {todoTasks.map((task) => {
          return (
            <div key={task.id}>
              <p>{task.id}</p>
              <p>{task.title}</p>
              <p>{task.date}</p>
            </div>
          )
        })}

        <Button
          variant="contained"
          color="primary"
          onClick={() => addTodoTasks(newTask)}
        >
          up
        </Button>
      </header>
    </div>
  )
}

export default App
