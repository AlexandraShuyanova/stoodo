import {useRouter} from "next/router";
import {useGetPostBySlugQuery} from "../../../services/StoodoService";
import {PostItem} from "@/components/PostItem/PostItem";
import styles from "./Post.module.scss"
import {skipToken} from "@reduxjs/toolkit/query";

export const Post = () => {
    const router = useRouter();
    const {query:{slug}} = router;
    const {data} = useGetPostBySlugQuery(typeof slug === "string" ? slug : skipToken,
        {
            // If the page is not yet generated, router.isFallback will be true
            // initially until getStaticProps() finishes running
            skip: router.isFallback,
        });

    return(
        <section>
            <div className={styles.container}>
                {data !== undefined ?
                <PostItem
                    key={data?.id}
                    item={data}
                />
                : <div></div>
                }
            </div>
        </section>
    )
}
