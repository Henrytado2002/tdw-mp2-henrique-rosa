import { createSlice } from '@reduxjs/toolkit'

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    chars: [],
  },
  reducers: {
    add: (state, action) => {
      state.chars.push(action.payload)
    },
    //deletes by index
    del : (state, action) => {
      state.chars = state.chars.filter((_, index) => index !== action.payload);
    },
    overwrite:(state, action) => {
      state.chars = [...action.payload];
      
    },
  },
})

export const { add, del, overwrite } = listSlice.actions

export default listSlice.reducer