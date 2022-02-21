import {createSlice} from '@reduxjs/toolkit'

const userRedux = createSlice({
    name:'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        logout: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        },

        registerStart: (state) => {
            state.isFetching = true
        },
        registerSuccess: (state) => {
            state.isFetching = false
            state.error = false
        },
        registerFailure: (state) => {
            state.isFetching = false
            state.error = true
        },   
        
        reset: (state) =>{
            state.currentUser= null
            state.isFetching= false
            state.error= false
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logout, registerStart, registerFailure, registerSuccess, reset} = userRedux.actions
export default userRedux.reducer;