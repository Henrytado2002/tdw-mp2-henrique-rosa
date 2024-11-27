import { configureStore } from '@reduxjs/toolkit'
import  filterReducer  from './FavChar/filterSlice'
import listReducer from './FavChar/listSlice'

export default configureStore({
  reducer: {
    filter: filterReducer,
    list: listReducer,
  },
})