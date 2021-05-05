import React from 'react'
import { Button } from '@material-ui/core'
import useTodoTasks from 'src/store/todoTasks/hooks'
import './App.css'
import { getFormattedDate } from 'src/utils/dateUtils'

function App(): JSX.Element {
  const {
    todoTasks,
    addTodoTasks,
    deleteTodoTasks,
    updateTodoTasks,
  } = useTodoTasks()

  const newTask = {
    title: 'テスト',
    deadline: getFormattedDate(new Date()),
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button
          variant="contained"
          color="primary"
          onClick={() => addTodoTasks(newTask)}
        >
          新規作成
        </Button>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        {todoTasks.map((task) => {
          return (
            <div key={task.id}>
              <p>{task.title}</p>
              <p>期限: {task.deadline}</p>

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
                    deadline: getFormattedDate(new Date()),
                  })
                }
              >
                アップデート
              </Button>
            </div>
          )
        })}
      </header>
    </div>
  )
}

export default App
