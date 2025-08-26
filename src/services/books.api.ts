import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBook, IBorrowInput, IBorrowSummaryItem } from '@/types';

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api` }),
    tagTypes: ['Books', 'BorrowSummary'],
    endpoints: (build) => ({
        getBooks: build.query<
            IBook[],
            { sortBy?: string; sort?: string; limit?: number } | void
        >({
            query: (params) => ({
                url: '/books',
                params: params ?? {}, // if params is undefined, pass empty object
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((book) => ({ type: 'Books' as const, id: book._id })),
                        { type: 'Books' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Books' as const, id: 'LIST' }],
            transformResponse: (resp: any) => resp.data ?? resp,
        }),


        getBook: build.query<IBook, string>({
            query: (id) => `/books/${id}`,
            providesTags: (_res, _err, id) => [{ type: 'Books' as const, id }],
            transformResponse: (resp: any) => resp.data ?? resp,
        }),

        createBook: build.mutation<IBook, IBook>({
            query: (body) => ({ url: '/books', method: 'POST', body }),
            invalidatesTags: [{ type: 'Books', id: 'LIST' }],
            transformResponse: (resp: any) => resp.data ?? resp,
        }),

        updateBook: build.mutation<IBook, { id: string; data: Partial<IBook> }>({
            query: ({ id, data }) => ({ url: `/books/${id}`, method: 'PATCH', body: data }),
            async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
                const patch = dispatch(
                    booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
                        const idx = draft.findIndex((b) => b._id === id);
                        if (idx !== -1) draft[idx] = { ...draft[idx], ...data } as any;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },
            invalidatesTags: (_res, _err, { id }) => [{ type: 'Books', id }],
            transformResponse: (resp: any) => resp.data ?? resp,
        }),

        deleteBook: build.mutation<{ success: boolean }, string>({
            query: (id) => ({ url: `/books/${id}`, method: 'DELETE' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patch = dispatch(
                    booksApi.util.updateQueryData('getBooks', undefined, (draft) => {
                        const i = draft.findIndex((b) => b._id === id);
                        if (i !== -1) draft.splice(i, 1);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },
            invalidatesTags: (_res, _err, id) => [
                { type: 'Books', id },
                { type: 'Books', id: 'LIST' },
            ],
        }),

        borrowBook: build.mutation<any, IBorrowInput>({
            query: (body) => ({ url: '/borrow', method: 'POST', body }),
            invalidatesTags: [
                { type: 'Books', id: 'LIST' },
                { type: 'BorrowSummary', id: 'LIST' },
            ],
        }),

        getBorrowSummary: build.query<IBorrowSummaryItem[], void>({
            query: () => '/borrow',
            providesTags: [{ type: 'BorrowSummary', id: 'LIST' }],
            transformResponse: (resp: any) => resp.data ?? resp,
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetBookQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
    useBorrowBookMutation,
    useGetBorrowSummaryQuery,
} = booksApi;
