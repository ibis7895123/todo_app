import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  // todos: null,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
