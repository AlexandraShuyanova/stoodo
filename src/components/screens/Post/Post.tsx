import {useRouter} from "next/router";
import {useGetPostBySlugQuery} from "../../../services/StoodoService";
import {PostItem} from "@/components/PostItem/PostItem";
import styles from "./Post.module.scss"

export const Post = () => {

    const {query:{slug}} = useRouter();
    const {data} = useGetPostBySlugQuery(slug);

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