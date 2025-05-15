import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: string | null
  username: string | null
  email: string | null
  avatar_url: string | null
    full_name: string | null
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  avatar_url: null,
  full_name: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload }
    },
    clearUser() {
      return initialState
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
