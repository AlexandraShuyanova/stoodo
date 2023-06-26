import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IPosts} from "@/types/IPosts"

export interface UserResponse {
    access_token: string
}

export interface LoginRequest {
    username: string
    password: string,
    saveSession: boolean
}
export const stoodoAPI = createApi({
    reducerPath: 'stoodoAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3001/api/v1/'
    }),
    endpoints: (build) => ({
        getListPublished: build.query<IPosts, any>({
            query: () => `post/list_published?page=0&size=10`
        }),
        login: build.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/authenticate',
                method: 'POST',
                body: credentials,
            }),
        }),
        protected: build.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    }),
});

export const { useGetListPublishedQuery, useLoginMutation, useProtectedMutation } = stoodoAPI;