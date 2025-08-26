// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import { booksApi } from "../services/books.api"; // 👈 import booksApi

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [booksApi.reducerPath]: booksApi.reducer, // 👈 add booksApi
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(baseApi.middleware)
            .concat(booksApi.middleware), // 👈 add booksApi middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
