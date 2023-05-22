import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface WebsocketState {
  websocket: WebSocket | null
}

const initialState: WebsocketState = {
  websocket: null
}

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setWebsocket: (state, action: PayloadAction<{ websocket: WebSocket | null }>) => {
      state.websocket = action.payload.websocket
    },
  },
})

export const { setWebsocket } = websocketSlice.actions

export const selectWebsocket = (state: RootState) => state.websocket

export default websocketSlice.reducer