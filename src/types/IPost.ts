import {IUser} from "./IUser"
export interface IPost {
    id: string,
    createdBy: string;
    createdAt: string,
    lastModifiedBy: string,
    lastModifiedAt: string,
    title: string,
    slug: string,
    image: IImage,
    description: string,
    topic: ITopic,
    isPublished: boolean,
    owner: IUser,
    tags: ITag[],
}
export interface IImage {
    createdBy?: string,
    createdAt?: string,
    lastModifiedBy?: string,
    lastModifiedAt?: string,
    id?: string,
    url?: string,
}
export interface ITopic {
    id: string,
    topic: string,
}

export interface ITag {
    id: string,
    tag: string,
}

export interface UserPostInteraction {
    liked: boolean,
    opened: boolean,
    viewed: boolean,
}

export interface PostContentResponse {
    createdBy: string,
    createdAt: string,
    lastModifiedBy: string,
    lastModifiedAt: string,
    id: string,
    version: number,
    text: string,
    post: IPost,
    currentVersion: boolean,
}

export interface PostStat {
    likes_count: number,
    opened_count: number,
    views_count: number,
}

