import React from 'react'
import { TaskListItemProps } from 'src/types/components/taskListItem'
import styled from 'styled-components'
import { TaskCheckbox } from 'src/components/materialUi'

export const TaskListItem = (props: TaskListItemProps): JSX.Element => {
  const { task, onCheck, onClickItem } = props

  return (
    <TaskDiv>
      <TaskCheckbox
        color="primary"
        onChange={onCheck}
        checked={task.isDone}
        value={task.id} // taskIdでどれをチェックしたか特定する
      />

      <TaskTextDiv onClick={onClickItem}>
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
}

const TaskDiv = styled.div`
  display: flex;
  width: 100%;
  align-self: flex-start;
  padding: 15px 0px 15px;
  border-bottom: 1px solid white;
`

const TaskTextDiv = styled.div`
  text-align: left;
  width: 100%;
  padding-left: 10px;
`

const TaskTitle = styled.p`
  margin: 0 0 5px;
`

const TaskDeadline = styled.span`
  font-size: 12px;
`
