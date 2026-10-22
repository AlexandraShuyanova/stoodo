import * as postService from './post.service';
import { Request, Response } from 'express'

export async function createPost(req: Request, res: Response) {
    try {
        const createPostResponse = await postService.createPost(
            req.body,
            req.user!.id
        );
        res.status(201).json(createPostResponse);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export async function getPosts(req: Request, res: Response) {
    try {
        const listPublishedResponse = await postService.getPosts();
        res.status(200).json(listPublishedResponse);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export async function getPostBySlug(req: Request, res: Response) {
    try {
        const post = await postService.getPostBySlug(req.params.slug as string)
        if (!post)
            return res.status(404).json({ error: "Post not found" })
        res.status(200).json(post)
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}

export async function likePost(req: Request, res: Response) {
    try {
        const isLiked = req.query.isLiked === "true";
        const likePostResponse = await postService.likePost(
            req.params.id as string,
            req.user!.id,
            isLiked
        );
        res.status(200).json(likePostResponse);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}

export async function getUserPostInteraction(req: Request, res: Response) {
    try {
        const result = await postService.getUserPostInteraction(
            req.params.id as string,
            req.user!.id
        );
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}