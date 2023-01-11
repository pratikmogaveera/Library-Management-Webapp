import { apiSlice } from "../../app/api/apiSlice"


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'GET'
            })
        }),

        signUp: builder.mutation({
            query: credentials => ({
                url: '/users/register',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignUpMutation
} = authApiSlice