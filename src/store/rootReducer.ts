import 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
import { tasksReducer } from 'src/store/tasks/slice'

const rootReducer = combineReducers({
  task: tasksReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
