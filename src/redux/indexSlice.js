import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isGlobalLoading: false,
    error: null,
    errors: null
}

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    LOADING_START: (state) => {
        state.isGlobalLoading = true;
    },
    LOADING_END: (state) => {
        state.isGlobalLoading = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { LOADING_START, LOADING_END } = indexSlice.actions

export default indexSlice.reducer