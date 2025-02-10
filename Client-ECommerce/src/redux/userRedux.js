import {createSlice} from '@reduxjs/toolkit'

const userRedux = createSlice({
    name:'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isAuthorized: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
            state.isAuthorized = true
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        logout: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
            state.isAuthorized = false;
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
            state.isAuthorized = false
        },

        setAuthorized: (state, action) => {
            state.isAuthorized = action.payload;
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logout, registerStart, registerFailure, registerSuccess, reset, setAuthorized} = userRedux.actions
export default userRedux.reducer;