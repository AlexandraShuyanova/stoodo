import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IPosts} from "@/types/IPosts"
import {RootState} from "../store/store";
import {IImage} from "@/types/IPost";

export interface UserResponse {
    access_token: string
}

export interface LoginRequest {
    username: string,
    password: string,
    saveSession: boolean
}

export interface CreatePostRequest {
    title: string,
    slug: string,
    image: string,
    description: string,
    topic: string,
    tagsList: string[],
}

export const stoodoAPI = createApi({
    reducerPath: 'stoodoAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3001/api/v1/',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        getListPublished: build.query<IPosts, any>({
            query: () => `post/list_published?page=0&size=10`
        }),
        getListNotPublished: build.query<IPosts, any>({
            query: () => `post/list_not_published?page=0&size=10`
        }),
        login: build.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/authenticate',
                method: 'POST',
                body: credentials,
            }),
        }),
        createPost: build.mutation<any, CreatePostRequest>({
            query:(credentials) => ({
                url: 'post/create',
                method: 'POST',
                body: credentials,
            }),
        }),
        uploadImage: build.mutation<IImage, FormData> ({
            query: (credentials) => ({
                url: '/image/upload',
                method: 'POST',
                body: credentials,
            })
        }),
        protected: build.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    }),
});

export const { useGetListPublishedQuery, useGetListNotPublishedQuery, useLoginMutation, useProtectedMutation, useCreatePostMutation, useUploadImageMutation  } = stoodoAPI;