import React, { useState } from 'react'
import { Button, Dialog, TextField } from '@material-ui/core'
import styled from 'styled-components'
import useTasks from 'src/store/tasks/hooks'
import { NewTask, Task } from 'src/types/task'
import { TaskTextField } from 'src/components/materialUi'
import { TaskListItem } from 'src/components/taskListItem'
import './App.css'

function App(): JSX.Element {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const [editTaskTitle, setEditTaskTitle] = useState<string>('')
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
    if (!newTaskTitle) return

    const newTask: NewTask = {
      title: newTaskTitle,
    }

    // 新規タスクの作成
    addTask(newTask)

    // タスク作成したらinputを空にする
    setNewTaskTitle('')
  }

  const onUpdateTask = (task: Task) => {
    console.log(event)

    if (!editTaskTitle) return

    const updatedTask: Task = {
      ...task,
      title: editTaskTitle,
    }

    // 新規タスクの作成
    updateTask(updatedTask)
  }

  const onNewTaskTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value)
  }

  const onEditTaskTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditTaskTitle(event.target.value)
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

  const onClickItem = (task: Task) => {
    // 編集するタイトルをセット
    setEditTaskTitle(task.title)

    setDialogVisible(true)
  }

  const dialogClose = () => {
    setDialogVisible(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>タスク</h2>

        <TaskInputDiv>
          <TaskTextField
            label="タスクを入力"
            type="text"
            value={newTaskTitle}
            onChange={onNewTaskTitleChange}
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
            <div key={task.id}>
              <TaskDialog open={dialogVisible} onClose={dialogClose}>
                <DialogContainerDiv>
                  <TextField
                    label="タスクを編集"
                    type="text"
                    value={editTaskTitle}
                    onChange={onEditTaskTitleChange}
                    onBlur={() => onUpdateTask(task)}
                  />

                  <div>
                    <Button color="primary">今日の予定に追加</Button>
                    <Button color="primary">期限日の追加</Button>
                  </div>

                  <p>メモ</p>
                </DialogContainerDiv>
              </TaskDialog>

              <TaskListItem
                task={task}
                onCheck={onCheck}
                onClickItem={() => onClickItem(task)}
              />
            </div>
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

const TaskDialog = styled(Dialog)`
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
`

export default App
