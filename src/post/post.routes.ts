import { Router } from 'express';
import {createPost, getPosts, getPostBySlug, likePost, getUserPostInteraction} from './post.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import {userInfo} from "../auth/auth.controller";

const router = Router();

router.get('/posts', getPosts);
router.get('/post_by_slug/:slug', getPostBySlug);
router.get('/user_interaction_by_post/:id', authMiddleware, getUserPostInteraction);
router.post('/create', authMiddleware, createPost);
router.post('/like_post/:id', authMiddleware, likePost);

export default router;