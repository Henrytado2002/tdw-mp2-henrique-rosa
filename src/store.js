import { configureStore } from '@reduxjs/toolkit'
import  filterReducer  from './FavChar/filterSlice'
import listReducer from './FavChar/listSlice'
import apiSlice from './AllChar/apiSlice'; // Import the RTK Query API slice

export default configureStore({
  reducer: {
    filter: filterReducer,
    list: listReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})