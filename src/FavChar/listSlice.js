import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    chars: [],
    charsForTierList: [],
    num: 0,
    numForTierList: 0,
  },
  reducers: {
    add: (state, action) => {
      state.chars.push(action.payload);
      state.num += 1; // Increment num correctly
      console.log("Added:", action.payload);
      localStorage.setItem('list', JSON.stringify(state.chars))
    },
    add_for_tier: (state, action) => {
      state.charsForTierList.push(action.payload);
      state.numForTierList += 1; // Increment numForTierList correctly
      console.log("Added for tier:", action.payload);
      localStorage.setItem('tierlist', JSON.stringify(state.charsForTierList))
    },
    del: (state, action) => {
      state.chars = state.chars.filter((_, index) => index !== action.payload);
      state.num = Math.max(0, state.num - 1); // Prevent num from going negative
      console.log("Deleted index:", action.payload);
      localStorage.setItem('list', JSON.stringify(state.chars))
    },
    del_for_tier: (state, action) => {
      state.charsForTierList = state.charsForTierList.filter((_, index) => index !== action.payload);
      state.numForTierList = Math.max(0, state.numForTierList - 1); // Prevent numForTierList from going negative
      console.log("Deleted for tier index:", action.payload);
      localStorage.setItem('tierlist', JSON.stringify(state.charsForTierList))
    },
    overwrite: (state, action) => {
      state.chars = [...action.payload]; // Replace chars array
      state.num = action.payload.length; // Update num
      console.log("Overwritten chars:", action.payload);
      localStorage.setItem('list', JSON.stringify(state.chars))
    },
    overwrite_for_tier: (state, action) => {
      state.charsForTierList = [...action.payload]; // Replace charsForTierList array
      state.numForTierList = action.payload.length; // Update numForTierList
      console.log("Overwritten chars for tier:", action.payload);
      localStorage.setItem('tierlist', JSON.stringify(state.charsForTierList))
    },
  },
});

// Exporting actions
export const { add, del, add_for_tier, del_for_tier, overwrite, overwrite_for_tier } = listSlice.actions;

// Exporting reducer
export default listSlice.reducer;