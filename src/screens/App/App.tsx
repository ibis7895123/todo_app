import React, { ChangeEvent, useState } from 'react'
import { Button } from '@material-ui/core'
import useTasks from 'src/store/tasks/hooks'
import './App.css'
import { getFormattedDate } from 'src/utils/dateUtils'
import { NewTask } from 'src/types/task'
import { TaskTextField, TaskCheckbox } from 'src/components/material-ui'
import styled from 'styled-components'

function App(): JSX.Element {
  const [inputTaskTitle, setInputTaskTitle] = useState<string>('')

  const {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    toggleIsDoneTask,
  } = useTasks()

  // todoタスク
  const todoTasks = tasks.filter((task) => {
    return !task.isDone
  })

  // 完了タスク
  const doneTasks = tasks.filter((task) => {
    return task.isDone
  })

  const onAddNewTask = () => {
    if (!inputTaskTitle) return

    const newTask: NewTask = {
      title: inputTaskTitle,
    }

    // 新規タスクの作成
    addTask(newTask)

    // タスク作成したらinputを空にする
    setInputTaskTitle('')
  }

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTaskTitle(event.target.value)
  }

  const onCheck = (event: ChangeEvent<HTMLInputElement>) => {
    // taskIdをvalueから取得
    const taskId = Number(event.target.value)

    if (!taskId) return

    const checkTask = tasks.find((task) => {
      return task.id === taskId
    })

    if (!checkTask) return

    toggleIsDoneTask(checkTask)
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
            onChange={onTextChange}
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
              <TaskCheckbox
                color="primary"
                onChange={onCheck}
                checked={task.isDone}
                value={task.id} // taskIdでどれをチェックしたか特定する
              />

              <TaskTextDiv>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDeadline>期限: {task.deadline}</TaskDeadline>
              </TaskTextDiv>

              {/* <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteTask(task)}
                >
                  削除
                </Button>

                <Button
                  variant="contained"
                  onClick={() =>
                    updateTask({
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

        <TaskDoneTitle>完了</TaskDoneTitle>
        {doneTasks.map((task) => {
          return (
            <TaskDiv key={task.id}>
              <TaskCheckbox
                color="primary"
                onChange={onCheck}
                checked={task.isDone}
                value={task.id} // taskIdでどれをチェックしたか特定する
              />

              <TaskTextDiv>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDeadline>期限: {task.deadline}</TaskDeadline>
              </TaskTextDiv>
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

const TaskDoneTitle = styled.h3`
  margin-top: 50px;
`

export default App
