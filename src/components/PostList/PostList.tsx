import {useEffect, useState} from 'react';
import {PostItem} from "@/components/PostItem/PostItem";
import styles from "./PostList.module.scss";
import {useGetListNotPublishedQuery, useGetListPublishedQuery} from "../../services/StoodoService";

export const PostList = () => {
    const {data, isFetching} = useGetListNotPublishedQuery('');

    return (
        <section>
            <div className={styles.container}>
                {data?.content?.map(post =>
                    <PostItem
                        key={post.id}
                        item={post}
                    />
                )}
            </div>
        </section>
    );
};
