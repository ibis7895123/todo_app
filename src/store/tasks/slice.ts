import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewTask, Task, TaskState } from 'src/types/task'

const initialState: TaskState = {
  currentId: 1,
  tasks: [],
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state: TaskState, action: PayloadAction<NewTask>) => {
      return {
        ...state,
        currentId: state.currentId + 1,
        tasks: [
          ...state.tasks,
          // title以外は空のデータを入れる
          {
            id: state.currentId,
            title: action.payload.title,
            deadline: '',
            isDone: false,
          },
        ],
      }
    },
    updateTask: (state: TaskState, action: PayloadAction<Task>) => {
      const updatedTasks = state.tasks.map((task) => {
        // 指定されたidのみ更新した値を返す
        if (task.id === action.payload.id) {
          return {
            id: action.payload.id,
            title: action.payload.title,
            deadline: action.payload.deadline,
            isDone: action.payload.isDone,
          }
        }

        return task
      })

      return {
        ...state,
        tasks: updatedTasks,
      }
    },
    deleteTask: (state: TaskState, action: PayloadAction<Task>) => {
      const filterdTasks = state.tasks.filter((task) => {
        return task.id !== action.payload.id
      })

      return {
        ...state,
        tasks: filterdTasks,
      }
    },
    toggleIsDoneTask: (state: TaskState, action: PayloadAction<Task>) => {
      const updatedTasks = state.tasks.map((task) => {
        // 指定されたidのみ更新した値を返す
        if (task.id === action.payload.id) {
          return {
            id: action.payload.id,
            title: action.payload.title,
            deadline: action.payload.deadline,
            isDone: !action.payload.isDone, // isDoneを反転させる
          }
        }

        return task
      })

      return {
        ...state,
        tasks: updatedTasks,
      }
    },
  },
})

// Reducerのエクスポート
export const taskReducer = taskSlice.reducer

// Action Creatersのエクスポート
export const {
  addTask,
  deleteTask,
  updateTask,
  toggleIsDoneTask,
} = taskSlice.actions
