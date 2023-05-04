import {useState} from 'react';
import Link from 'next/link'

const Posts = () => {
    const [posts, setEvents] = useState([
        {id: 1, name: 'post1'},
        {id: 2, name: 'post2'}
        ]
    )
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post =>
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            {post.name}
                        </Link>
                    </li>
                )}
            </ul>
        </div>

    );
};

export default Posts;
