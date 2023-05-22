import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface HistoryState {
  messages: string[]
}

const initialState: HistoryState = {
  messages: []
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.messages.push(action.payload.message)
    },
  },
})

export const { addMessage } = historySlice.actions

export const selectHistory = (state: RootState) => state.history

export default historySlice.reducer