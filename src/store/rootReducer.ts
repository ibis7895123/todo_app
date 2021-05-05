import 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
import { todoTasksReducer } from './todoTasks/slice'

const rootReducer = combineReducers({
  todoTasks: todoTasksReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
