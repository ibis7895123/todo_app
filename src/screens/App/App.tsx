import React, { ChangeEvent, useState } from 'react'
import { Button } from '@material-ui/core'
import useTodoTasks from 'src/store/todoTasks/hooks'
import './App.css'
import { getFormattedDate } from 'src/utils/dateUtils'
import { NewTask } from 'src/types/task'
import { TaskTextField, TaskCheckbox } from 'src/components/Feild'
import styled from 'styled-components'

function App(): JSX.Element {
  const [inputTaskTitle, setInputTaskTitle] = useState<string>('')

  const {
    todoTasks,
    addTodoTasks,
    deleteTodoTasks,
    updateTodoTasks,
  } = useTodoTasks()

  const onAddNewTask = () => {
    if (!inputTaskTitle) return

    const newTask: NewTask = {
      title: inputTaskTitle,
    }

    // 新規タスクの作成
    addTodoTasks(newTask)

    // タスク作成したらinputを空にする
    setInputTaskTitle('')
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTaskTitle(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>タスク</h2>

        <TaskInputDiv>
          <TaskTextField
            label="タスクを入力"
            type="text"
            value={inputTaskTitle}
            onChange={onChange}
            // onBlur={onAddNewTask}
          />

          <AddTaskButton
            variant="contained"
            color="primary"
            onClick={onAddNewTask}
          >
            追加
          </AddTaskButton>
        </TaskInputDiv>

        {todoTasks.map((task) => {
          return (
            <TaskDiv key={task.id}>
              <TaskCheckbox color="primary" />

              <TaskTextDiv>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDeadline>期限: {task.deadline}</TaskDeadline>
              </TaskTextDiv>

              {/* <div>
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
                      title: task.title + ' update',
                      deadline: getFormattedDate(new Date()),
                    })
                  }
                >
                  アップデート
                </Button>
              </div> */}
            </TaskDiv>
          )
        })}
      </header>
    </div>
  )
}

const TaskInputDiv = styled.div`
  padding: 0 0 20px;
`

const AddTaskButton = styled(Button)`
  margin-top: 13px;
  margin-left: 10px;
`

const TaskDiv = styled.div`
  display: flex;
  width: 100%;
  align-self: flex-start;
  padding: 15px 0px 15px;
  border-bottom: 1px solid white;
`

const TaskTextDiv = styled.div`
  text-align: left;
  padding-left: 10px;
`

const TaskTitle = styled.p`
  margin: 0 0 5px;
`

const TaskDeadline = styled.span`
  font-size: 12px;
`

export default App
