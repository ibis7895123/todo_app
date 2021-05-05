import 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
import { taskReducer } from 'src/store/tasks/slice'

const rootReducer = combineReducers({
  task: taskReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
