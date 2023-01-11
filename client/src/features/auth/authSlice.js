import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, roles: null, isAdmin: null, isEditor: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, roles, isAdmin, isEditor } = action.payload
            state.user = user
            state.token = accessToken
            state.roles = roles
            state.isAdmin = isAdmin
            state.isEditor = isEditor
        },

        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.roles = null
            state.isAdmin = null
            state.isEditor = null
        }
    },
})


export const { setCredentials, logOut } = authSlice.actions

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentAuths = (state) => ({ isAdmin: state.auth.isAdmin, isEditor: state.auth.isEditor })
export const selectCurrentToken = (state) => state.auth.token

export default authSlice.reducer