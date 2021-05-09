import React, { useState } from 'react'
import { Button, Checkbox, Dialog, TextField } from '@material-ui/core'
import styled from 'styled-components'
import useTasks from 'src/store/tasks/hooks'
import { NewTask, Task } from 'src/types/task'
import { TaskTextField } from 'src/components/materialUi'
import { TaskListItem } from 'src/components/taskListItem'
import './App.css'
import { getTextFieldValueDate, isToday } from 'src/utils/dateUtils'

function App(): JSX.Element {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const [editTask, setEditTask] = useState<Task>({
    id: 0,
    title: '',
    deadline: new Date(),
    isDone: false,
  })
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)

  const { tasks, addTask, deleteTask, updateTask } = useTasks()

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

  const onUpdateTaskTitle = (task: Task) => {
    if (!editTask) return

    const updatedTask: Task = {
      ...task,
      title: editTask.title,
    }

    // 新規タスクの作成
    updateTask(updatedTask)
    setEditTask(updatedTask)
  }

  const onUpdateTaskDeadline = ({
    task,
    deadline,
  }: {
    task: Task
    deadline: Date | null
  }) => {
    const updatedTask: Task = {
      ...task,
      deadline: deadline,
    }

    // タスクのアップデート
    updateTask(updatedTask)
    setEditTask(updatedTask)
  }

  const onNewTaskTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value)
  }

  const onEditTaskTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditTask({
      ...editTask,
      title: event.target.value,
    })
  }

  const onDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateDeadline = new Date(event.target.value)

    setEditTask({
      ...editTask,
      deadline: updateDeadline,
    })

    console.log({ updateDeadline, date: editTask.deadline })
  }

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
        <TaskDialog open={dialogVisible} onClose={dialogClose}>
          <DialogContainerDiv>
            <div>
              <Checkbox
                color="primary"
                onChange={onCheck}
                checked={editTask.isDone}
                value={editTask.id} // taskIdでどれをチェックしたか特定する
              />

              <TextField
                label="タスクを編集"
                type="text"
                value={editTask.title}
                onChange={onEditTaskTitleChange}
                onBlur={() => onUpdateTaskTitle(editTask)}
              />
            </div>

            <div>
              {isToday(editTask.deadline) ? (
                <Button
                  color="secondary"
                  onClick={() =>
                    onUpdateTaskDeadline({
                      task: editTask,
                      deadline: null,
                    })
                  }
                >
                  今日の予定から削除
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={() =>
                    onUpdateTaskDeadline({
                      task: editTask,
                      deadline: new Date(),
                    })
                  }
                >
                  今日の予定に追加
                </Button>
              )}

              <Button color="primary">期限日の追加</Button>
              <TextField
                type="date"
                value={getTextFieldValueDate(editTask.deadline)}
                onChange={onDeadlineChange}
              />
            </div>

            <p>メモ</p>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteTask(editTask)}
            >
              削除
            </Button>
          </DialogContainerDiv>
        </TaskDialog>

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
  }
  .MuiDialog-paperScrollPaper {
    max-height: unset;
  }
`

const DialogContainerDiv = styled.div`
  padding: 30px;
  height: 100%;
`

export default App
