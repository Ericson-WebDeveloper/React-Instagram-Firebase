import { createSlice } from '@reduxjs/toolkit'
import { signinGoogle, signOutUser } from '../actions/AuthController';

const initialState = {
    user: null,
    isLoading: false,
    errors: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    INITIAL_SIGNIN: (state) => {
        state.isLoading = true;
    },
    SIGNIN_FINISH: (state) => {
        state.isLoading = false;
    },

    SET_USER: (state, action) => {
        state.user = action.payload.user;
    },
    SET_ERROR: (state, action) => {
        state.errors = action.payload.error
    }
  },
})

// Action creators are generated for each case reducer function
export const { INITIAL_SIGNIN, SIGNIN_FINISH, SET_USER, SET_ERROR } = userSlice.actions

export const signin =  () => async (dispatch) => {
    try {
        dispatch(INITIAL_SIGNIN());
        let response = await signinGoogle();
        dispatch(SET_USER({user:response.user}));
    } catch (error) {
        dispatch(SET_ERROR('Something wrong in Server'));
    } finally {
        dispatch(SIGNIN_FINISH());
    }
}

export const handleSignOut = () => async (dispatch) => {
    try {
        await signOutUser();
        dispatch(SET_USER({user:null}));
    } catch {
        dispatch(SET_USER({error: null}));
    }
   }

export default userSlice.reducer