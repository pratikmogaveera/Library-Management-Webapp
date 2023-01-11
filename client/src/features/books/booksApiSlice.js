import { apiSlice } from "../../app/api/apiSlice"

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addBook: builder.mutation({
            query: (book) => ({
                url: '/books/add',
                method: 'POST',
                body: { ...book }
            })
        }),

        updateBook: builder.mutation({
            query: (book) => ({
                url: `/books/update/${book.id}`,
                method: 'PUT',
                body: book
            })
        }),

        removeBook: builder.mutation({
            query: (id) => ({
                url: `/books/remove/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {
    useAddBookMutation,
    useUpdateBookMutation,
    useRemoveBookMutation,
} = booksApiSlice