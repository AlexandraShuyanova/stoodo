import {useState} from 'react';
import {PostItem} from "@/components/PostItem/PostItem";
import styles from "./PostList.module.scss";

export const PostList = () => {

    const [posts, setPosts] = useState([
            {id: 1, title: 'JavaScript', description: 'JavaScript - это язык программирования'},
            {id: 2, title: 'Java', description: 'Java - это язык программирования'},
            {id: 3, title: 'Java', description: 'Java - это язык программирования'},
            {id: 4, title: 'Java', description: 'Java - это язык программирования'}
        ]
    )
    return (
        <section>
            <div className={styles.container}>
                {posts.map((post, index) =>
                    <PostItem
                        key={post.id}
                        //item={post}*/
                    />
                )}
            </div>
        </section>

    );
};
