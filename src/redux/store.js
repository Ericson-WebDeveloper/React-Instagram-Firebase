import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import postReducer from './postSlice';
import globalReducer from './indexSlice';


export const store = configureStore({
  reducer: {
    user:userReducer,
    post: postReducer,
    index: globalReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})