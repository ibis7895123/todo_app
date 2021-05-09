import React, { useEffect, useState } from 'react'
import { TaskEditDialogProps } from 'src/types/components/dialog'
import styled from 'styled-components'
import { Button, Checkbox, TextField, Dialog } from '@material-ui/core'
import { getTextFieldValueDate, isToday } from 'src/utils/dateUtils'
import useTasks from 'src/store/tasks/hooks'
import { Task } from 'src/types/task'
import { DeleteConfirmDialog } from 'src/components/DeleteConfirmDialog'

export const TaskEditDialog = (props: TaskEditDialogProps): JSX.Element => {
  const { initialTask, isVisible, dialogClose, onCheck } = props

  const { tasks, deleteTask, updateTask } = useTasks()

  const [updateTitle, setUpdateTitle] = useState<string>(initialTask.title)
  const [updateMemo, setUpdateMemo] = useState<string>(initialTask.memo)
  const [
    deleteConfirmDialogVisible,
    setDeleteConfirmDialogVisible,
  ] = useState<boolean>(false)

  // initialTaskのidでreduxのtasksを検索する(更新検知のため)
  const task = tasks.find((task) => {
    return task.id === initialTask.id
  })

  useEffect(() => {
    if (!task) return

    // reduxが更新されたらupdateTitleを更新
    setUpdateTitle(task.title)
    setUpdateMemo(task.memo)
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

  const onUpdateTaskMemo = (task: Task) => {
    if (!updateMemo) return

    const updatedTask: Task = {
      ...task,
      memo: updateMemo,
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
      <ContainerDiv>
        <InputDiv>
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
        </InputDiv>

        <ButtonsDiv>
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

          <DeadlineText>期限日の追加:</DeadlineText>
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
        </ButtonsDiv>

        <MemoDiv>
          <TextField
            label="メモ"
            type="text"
            value={updateMemo}
            multiline
            rows={10}
            onChange={(event) => setUpdateMemo(event.target.value)}
            onBlur={() => onUpdateTaskMemo(task)}
          />
        </MemoDiv>

        <DeleteButtonDiv>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setDeleteConfirmDialogVisible(true)
            }}
          >
            削除
          </Button>

          <DeleteConfirmDialog
            task={task}
            isVisible={deleteConfirmDialogVisible}
            dialogClose={() => {
              setDeleteConfirmDialogVisible(false)
            }}
            onDelete={() => deleteTask(task)}
          />
        </DeleteButtonDiv>
      </ContainerDiv>
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

const ContainerDiv = styled.div`
  padding: 40px 30px 30px;
  padding-left: 60px;
  height: 100%;
`

const InputDiv = styled.div`
  margin-left: -40px;
`

const DeadlineText = styled.p`
  margin: unset;
  margin-top: 15px;
  font-size: 12px;
`

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  button {
    padding: unset;
  }
`

const MemoDiv = styled.div`
  padding-top: 20px;
`

const DeleteButtonDiv = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
`
