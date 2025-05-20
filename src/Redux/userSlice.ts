import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: number | null
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
    setId(state,action: PayloadAction<number | null>) {
      return { ...state, id: action.payload }
    },
    setUser(state, action: PayloadAction<{
      username: string | null
      email: string | null
      avatar_url: string | null
      full_name: string | null
    }>) {
      return { ...state, ...action.payload }
    },
    clearUser() {
      return initialState
    },
  },
})

export const { setId,setUser, clearUser } = userSlice.actions
export default userSlice.reducer
