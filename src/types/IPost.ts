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
