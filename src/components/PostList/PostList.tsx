import {useEffect, useState} from 'react';
import {PostItem} from "@/components/PostItem/PostItem";
import styles from "./PostList.module.scss";
import {useGetListPublishedQuery} from "../../services/StoodoService";
import { useDispatch } from 'react-redux'
import {setCredentials} from "../../store/authSlice";

export const PostList = () => {

   // const {data, isFetching} = useGetListPublishedQuery('');
    const dispatch = useDispatch()
    useEffect(() => {
        let token = localStorage.getItem('token')

        if (token)
            dispatch(setCredentials({ access_token: token }))
    })
    const {data, isFetching} = useGetListPublishedQuery('');

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
