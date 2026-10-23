import {PrismaClient} from "@prisma/client";

export interface CreatePostRequest {
    title: string;
    image: string;
    topicId: string;
    content: string;
}

const prisma = new PrismaClient();

export async function createPost(data: CreatePostRequest, userId: string, userRole: string) {
    const { title, image, content, topicId} = data;

    if (!title || !content) {
        throw new Error('All fields are required');
    }

    const post = await prisma.posts.create({
        data: {
            title,
            slug: title.toLowerCase().replaceAll(' ', '-'),
            topic_id: topicId,
            image_id: image,
            owner_id: userId,
            is_published: userRole === 'ADMIN',
            created_by: userId,
            created_at: new Date(),
        }
    });

    console.log(post.id);

    const postContent = await prisma.posts_content.create({
        data: {
            post_id: post.id,
            text: content,
            version: 1,
            is_current_version: true,

            created_by: userId,
            created_at: new Date(),
        }
    });

    return {
        post,
        postContent,
    };
}

export async function getPosts() {

    const posts = await prisma.posts.findMany({
        where: {
            is_published: true,
        },
        include: {
            images: true,
            posts_content: {
                where: {
                    is_current_version: true
                },
            },
            owner: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                },
            },
        }
    });

    const formattedPosts = posts.map((post) => ({
        ...post,
        images: post.images
            ? {
                ...post.images,
                url: `${process.env.R2_PUBLIC_URL}/${post.images.key}`,
            }
            : null,
    }));

    return {
        content: formattedPosts,
    };
}

export async function getPostBySlug(slug: string) {
    const post  = await prisma.posts.findUnique({
        where: {slug},
        include: {
            images: true,
            topic: true,
            posts_content: {
                where: {
                    is_current_version: true
                },
            },
            owner: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                }
            }
        }
    })
    if (!post || !post.is_published) return null;
    return {
        ...post,
        images: post.images
            ? { ...post.images, url: `${process.env.R2_PUBLIC_URL}/${post.images.key}` }
            : null,
    };
}

export async function likePost(postId: string, userId: string, isLiked: boolean) {
    const post = await prisma.posts_user_history.upsert({
        where: { post_id_user_id: { post_id: postId, user_id: userId } },
        create: {
            post_id: postId,
            user_id: userId,
            is_liked: isLiked,
            is_opened: false,
            is_viewed: false,
        },
        update: {
            is_liked: isLiked,
        },
        select: {
            is_liked: true,
            is_opened: true,
            is_viewed: true,
        }
    });

    return {
        liked: post.is_liked,
        opened: post.is_opened,
        viewed: post.is_viewed,
    }
}

export async function getUserPostInteraction(postId: string, userId: string) {
    const post = await prisma.posts_user_history.findUnique({
        where: { post_id_user_id: { post_id: postId, user_id: userId } },
    });

    return {
        liked: post?.is_liked ?? false,
        opened: post?.is_opened ?? false,
        viewed: post?.is_viewed ?? false,
    };
}

export async function getPostStat(postId: string) {
    const [likes_count, opened_count, views_count] = await Promise.all([
        prisma.posts_user_history.count({ where: {post_id: postId, is_liked: true} }),
        prisma.posts_user_history.count({ where: {post_id: postId, is_opened: true} }),
        prisma.posts_user_history.count({ where: {post_id: postId, is_viewed: true} }),
    ]);

    return {
        likes_count,
        opened_count,
        views_count,
    }
}