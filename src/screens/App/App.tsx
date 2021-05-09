import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import useTasks from 'src/store/tasks/hooks'
import { NewTask, Task } from 'src/types/task'
import { TaskTextField, TaskEditDialog, TaskListItem } from 'src/components'
import './App.css'

function App(): JSX.Element {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const [editTask, setEditTask] = useState<Task>({
    id: 0,
    title: '',
    deadline: '',
    memo: '',
    isDone: false,
  })
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)

  const { tasks, addTask, updateTask } = useTasks()

  // todoタスク
  const todoTasks = tasks
    .filter((task) => {
      return !task.isDone
    })
    .sort((prevTask, currentTask) => {
      const prevTime = new Date(prevTask.deadline).getTime()
      const currentTime = new Date(currentTask.deadline).getTime()
      return prevTime - currentTime
    })

  // 完了タスク
  const doneTasks = tasks
    .filter((task) => {
      return task.isDone
    })
    .sort((prevTask, currentTask) => {
      const prevTime = new Date(prevTask.deadline).getTime()
      const currentTime = new Date(currentTask.deadline).getTime()
      return prevTime - currentTime
    })

  // 新規タスクの作成
  const onAddNewTask = () => {
    if (!newTaskTitle) return

    const newTask: NewTask = {
      title: newTaskTitle,
    }

    addTask(newTask)

    // タスク作成したらinputを空にする
    setNewTaskTitle('')
  }

  const onNewTaskTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value)
  }

  // 完了チェック
  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    // taskIdをvalueから取得
    const taskId = Number(event.target.value)

    if (!taskId) return

    let checkTask = tasks.find((task) => {
      return task.id === taskId
    })

    if (!checkTask) return

    // 完了状態を反転
    checkTask = {
      ...checkTask,
      isDone: !checkTask.isDone,
    }

    // タスクのアップデート
    updateTask(checkTask)
    setEditTask(checkTask)
  }

  // タスクをクリック
  const onClickItem = (task: Task) => {
    // 編集するタスクをセット
    setEditTask(task)
    setDialogVisible(true)
  }

  const dialogClose = () => {
    setDialogVisible(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <TaskEditDialog
          initialTask={editTask}
          isVisible={dialogVisible}
          dialogClose={dialogClose}
          onCheck={onCheck}
        />

        <h2>タスク</h2>

        <TaskInputDiv>
          <TaskTextField
            label="タスクを入力"
            type="text"
            value={newTaskTitle}
            onChange={onNewTaskTitleChange}
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
              onClickItem={() => onClickItem(task)}
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
              onClickItem={() => onClickItem(task)}
            />
          )
        })}
      </header>
    </div>
  )
}

const TaskInputDiv = styled.div`
  padding: 0 0 30px;
`

const AddTaskButton = styled(Button)`
  margin-top: 13px;
  margin-left: 10px;
`

const TaskDoneTitle = styled.h3`
  margin-top: 70px;
`

export default App
