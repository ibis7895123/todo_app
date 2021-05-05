import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewTask, Task } from '../../types/task'

const initialState: Task[] = []

const todoTasksSlice = createSlice({
  name: 'todoTasks',
  initialState,
  reducers: {
    addTodoTask: (state: Task[], action: PayloadAction<NewTask>) => {
      return [
        ...state,
        {
          id: state.length + 1,
          title: action.payload.title,
          date: action.payload.date,
        },
      ]
    },
    updateTodoTask: (state: Task[], action: PayloadAction<Task>) => {
      state[action.payload.id] = {
        id: action.payload.id,
        title: action.payload.title,
        date: action.payload.date,
      }

      return state
    },
    deleteTodoTask: (state: Task[], action: PayloadAction<Task>) => {
      const filterdState = state.filter((task) => {
        return task.id !== action.payload.id
      })

      return filterdState
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
