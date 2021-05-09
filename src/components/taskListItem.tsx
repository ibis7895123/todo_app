import React from 'react'
import { TaskListItemProps } from 'src/types/components/taskListItem'
import styled from 'styled-components'
import { TaskCheckbox } from 'src/components/materialUi'
import { getFormattedDate, isToday } from 'src/utils/dateUtils'

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

      <TaskTextDiv onClick={() => onClickItem(task)}>
        <TaskTitle>{task.title}</TaskTitle>

        {task.deadline && (
          <TaskDeadline>
            {isToday(new Date(task.deadline))
              ? '今日の予定'
              : `期限: ${getFormattedDate(new Date(task.deadline))}`}
          </TaskDeadline>
        )}
      </TaskTextDiv>
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
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  padding-left: 10px;
`

const TaskTitle = styled.p`
  margin: 0 0 5px;
  display: flex;
  align-items: center;
  height: 100%;
`

const TaskDeadline = styled.span`
  font-size: 12px;
`
