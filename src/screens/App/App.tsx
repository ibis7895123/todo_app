import React, { useState } from 'react'
import { Button, Dialog } from '@material-ui/core'
import styled from 'styled-components'
import useTasks from 'src/store/tasks/hooks'
import { NewTask } from 'src/types/task'
import { TaskTextField } from 'src/components/materialUi'
import { TaskListItem } from 'src/components/taskListItem'
import './App.css'

function App(): JSX.Element {
  const [inputTaskTitle, setInputTaskTitle] = useState<string>('')
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)

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

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTaskTitle(event.target.value)
  }

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    // taskIdをvalueから取得
    const taskId = Number(event.target.value)

    if (!taskId) return

    const checkTask = tasks.find((task) => {
      return task.id === taskId
    })

    if (!checkTask) return

    toggleIsDoneTask(checkTask)
  }

  const onClickItem = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event)
    setDialogVisible(true)
  }

  const dialogClose = () => {
    setDialogVisible(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <TaskEditDialog open={dialogVisible} onClose={dialogClose}>
          <DialogContainerDiv>テスト</DialogContainerDiv>
        </TaskEditDialog>

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
            <TaskListItem
              key={task.id}
              task={task}
              onCheck={onCheck}
              onClickItem={onClickItem}
            />
          )
        })}

        <TaskDoneTitle>完了</TaskDoneTitle>

        {doneTasks.map((task) => {
          return (
            <TaskListItem
              key={task.id}
              task={task}
              onCheck={onCheck}
              onClickItem={onClickItem}
            />
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

const TaskDoneTitle = styled.h3`
  margin-top: 50px;
`

const TaskEditDialog = styled(Dialog)`
  .MuiDialog-paper {
    margin: unset;
    height: 100%;
  }
  .MuiDialog-scrollPaper {
    justify-content: flex-end;
    max-height: unset;
  }
`

const DialogContainerDiv = styled.div`
  padding: 30px;
  height: 100%;
  align-self: center;
`

export default App
