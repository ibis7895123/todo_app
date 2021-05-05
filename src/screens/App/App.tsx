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

              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteTodoTasks(task)}
              >
                削除
              </Button>

              <Button
                variant="contained"
                onClick={() =>
                  updateTodoTasks({
                    id: task.id,
                    title: 'テスト アップデート',
                    date: new Date().toString(),
                  })
                }
              >
                アップデート
              </Button>
            </div>
          )
        })}

        <Button
          variant="contained"
          color="primary"
          onClick={() => addTodoTasks(newTask)}
        >
          新規作成
        </Button>
      </header>
    </div>
  )
}

export default App
