import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IPosts} from "@/types/IPosts"
import {RootState} from "../store/store";
import {IPost, IImage, ITopic, UserPostInteraction, PostContentResponse, PostStat} from "@/types/IPost";

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
    topic: string|any|undefined,
    tagsList: string[],
}

export interface ITopics {
    content: ITopic[];
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
        getUserPostInteraction: build.query<UserPostInteraction, string> ({
            query: id => `post/user_interaction_by_post/${id}`
        }),
        getTopicsList: build.query<ITopics, any>({
            query:() => `post/topics_list?page=0&size=10`
        }),
        getPostContentById: build.query<PostContentResponse, string>({
            query: id=>`post/get_content_by_post_id/${id}`
        }),
        getPostStatById: build.query<PostStat, string>({
            query: id=>`post/post_stat/${id}`
        }),
        getPostBySlug: build.query<IPost, string | string[] | undefined>({
            query: slug=>`post/get_by_slug/${slug}`
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
        createPostContent: build.mutation<any, {text:string, postId: string}>({
            query:(credentials) => ({
                url: 'post/create_post_content',
                method: 'POST',
                body: credentials,
            }),
        }),
        uploadImage: build.mutation<IImage, FormData> ({
            query: (credentials) => ({
                url: 'image/upload',
                method: 'POST',
                body: credentials,
            })
        }),
        likePost: build.mutation<UserPostInteraction, {id:string, isLiked:boolean}> ({
            query: ({id, isLiked}) => ({
                url: `post/like_post/${id}?isLiked=${isLiked}`,
                method: 'POST',
            })
        }),
        protected: build.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    }),
});

export const { useGetListPublishedQuery, useGetListNotPublishedQuery,
    useGetUserPostInteractionQuery, useGetTopicsListQuery,
    useGetPostContentByIdQuery, useGetPostStatByIdQuery,
    useGetPostBySlugQuery, useLoginMutation,
    useProtectedMutation, useCreatePostMutation, useCreatePostContentMutation,
    useUploadImageMutation, useLikePostMutation  } = stoodoAPI;