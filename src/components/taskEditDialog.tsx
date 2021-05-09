import React, { useEffect, useState } from 'react'
import { TaskEditDialogProps } from 'src/types/components/taskEditDialog'
import styled from 'styled-components'
import { Button, Checkbox, Dialog, TextField } from '@material-ui/core'
import { getTextFieldValueDate, isToday } from 'src/utils/dateUtils'
import useTasks from 'src/store/tasks/hooks'
import { Task } from 'src/types/task'

export const TaskEditDialog = (props: TaskEditDialogProps): JSX.Element => {
  const { initialTask, isVisible, dialogClose, onCheck } = props
  const { tasks, deleteTask, updateTask } = useTasks()
  const [updateTitle, setUpdateTitle] = useState<string>(initialTask.title)

  // initialTaskのidでreduxのtasksを検索する(更新検知のため)
  const task = tasks.find((task) => {
    return task.id === initialTask.id
  })

  useEffect(() => {
    if (!task?.title) return

    // reduxが更新されたらupdateTitleを更新
    setUpdateTitle(task.title)
  }, [task])

  // タスクがなければ空のhtmlを返す
  if (!task) return <div />

  const onUpdateTaskTitle = (task: Task) => {
    if (!updateTitle) return

    const updatedTask: Task = {
      ...task,
      title: updateTitle,
    }

    // タスクのアップデート
    updateTask(updatedTask)
  }

  const onUpdateTaskDeadline = (props: { task: Task; deadline: string }) => {
    const updatedTask: Task = {
      ...props.task,
      deadline: props.deadline,
    }

    // タスクのアップデート
    updateTask(updatedTask)
  }

  return (
    <TaskDialog open={isVisible} onClose={dialogClose}>
      <DialogContainerDiv>
        <div>
          <Checkbox
            color="primary"
            onChange={onCheck}
            checked={task.isDone}
            value={task.id} // taskIdでどれをチェックしたか特定する
          />

          <TextField
            label="タスクを編集"
            type="text"
            value={updateTitle}
            onChange={(event) => setUpdateTitle(event.target.value)}
            onBlur={() => onUpdateTaskTitle(task)}
          />
        </div>

        <div>
          {isToday(new Date(task.deadline)) ? (
            <Button
              color="secondary"
              onClick={() => onUpdateTaskDeadline({ task: task, deadline: '' })}
            >
              今日の予定から削除
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={() =>
                onUpdateTaskDeadline({
                  task: task,
                  deadline: new Date().toString(),
                })
              }
            >
              今日の予定に追加
            </Button>
          )}

          <Button color="primary">期限日の追加</Button>
          <TextField
            type="date"
            value={getTextFieldValueDate(new Date(task.deadline))}
            onChange={(event) =>
              onUpdateTaskDeadline({
                task: task,
                deadline: new Date(event.target.value).toString(),
              })
            }
          />
        </div>

        <p>メモ</p>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteTask(task)}
        >
          削除
        </Button>
      </DialogContainerDiv>
    </TaskDialog>
  )
}

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
