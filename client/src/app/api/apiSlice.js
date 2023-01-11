import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    // Base URL Of API
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // Users Access Token
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.originalStatus === 403) {
        console.log('Sending refresh token')
        // Sending Refresh Token to get New Access Token
        const refreshResult = await baseQuery('/users/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // Store New Token.
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // Retry Original Query with new Token.
            result = await baseQuery(args, api, extraOptions)
        } else {
            // Logout User.
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})