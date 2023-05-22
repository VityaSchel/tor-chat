import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface UserState {
  username: string | null
}

const initialState: UserState = {
  username: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username
    },
  },
})

export const { setUsername } = userSlice.actions

export const selectUsername = (state: RootState) => state.user

export default userSlice.reducer