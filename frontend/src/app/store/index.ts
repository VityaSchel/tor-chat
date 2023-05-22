import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user'
import historyReducer from './slices/history'
import websocketReducer from './slices/websocket'

export const store = configureStore({
  reducer: {
    user: userReducer,
    history: historyReducer,
    websocket: websocketReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch