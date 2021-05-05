import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewTask, Task, TodoTasksState } from 'src/types/task'

const initialState: TodoTasksState = {
  currentId: 0,
  tasks: [],
}

const todoTasksSlice = createSlice({
  name: 'todoTasks',
  initialState,
  reducers: {
    addTodoTask: (state: TodoTasksState, action: PayloadAction<NewTask>) => {
      return {
        ...state,
        currentId: state.currentId + 1,
        tasks: [
          ...state.tasks,
          {
            id: state.currentId,
            title: action.payload.title,
            deadline: action.payload.deadline,
          },
        ],
      }
    },
    updateTodoTask: (state: TodoTasksState, action: PayloadAction<Task>) => {
      const updatedTasks = state.tasks.map((task) => {
        // 指定されたidのみ更新した値を返す
        if (task.id === action.payload.id) {
          return {
            id: action.payload.id,
            title: action.payload.title,
            deadline: action.payload.deadline,
          }
        }

        return task
      })

      return {
        ...state,
        tasks: updatedTasks,
      }
    },
    deleteTodoTask: (state: TodoTasksState, action: PayloadAction<Task>) => {
      const filterdTasks = state.tasks.filter((task) => {
        return task.id !== action.payload.id
      })

      return {
        ...state,
        tasks: filterdTasks,
      }
    },
  },
})

// Reducerのエクスポート
export const todoTasksReducer = todoTasksSlice.reducer

// Action Creatersのエクスポート
export const {
  addTodoTask,
  deleteTodoTask,
  updateTodoTask,
} = todoTasksSlice.actions
